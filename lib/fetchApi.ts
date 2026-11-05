// /lib/fetchApi.ts
import "server-only";
import { cache } from "react";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { Unauthorized, ApiInit } from "@/types/Api";
import { withTimeout, buildUrl } from "./http";
import { setCookiesFromResponse, type Jar } from "./cookies";

const REFRESH_PATH = "/refresh_access_token";
const SHARE_WINDOW_MS = 5_000; // itni der tak refresh ka result share hoga

async function readJar(): Promise<Jar> {
  const store = await cookies();
  return new Map(store.getAll().map((c) => [c.name, c.value]));
}

// Server Component mein ek request ke andar sab calls ek hi jar share karein
const getJar = cache(readJar);

const toHeader = (jar: Jar) =>
  [...jar].map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("; ");

function call(path: string, { params, ...init }: ApiInit = {}) {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(buildUrl(path, params), {
    ...init,
    headers,
    cache: "no-store",
    signal: withTimeout(),
  });
}

function withCookies(init: ApiInit, jar: Jar): ApiInit {
  const headers = new Headers(init.headers);
  if (jar.size) headers.set("Cookie", toHeader(jar));
  return { ...init, headers };
}

// ---------- Refresh dedupe (race condition se bachav) ----------
// key = cookies ka hash, value = backend ki Set-Cookie strings
const inflight = new Map<string, Promise<string[]>>();

function refreshShared(sentCookie: string): Promise<string[]> {
  const key = createHash("sha256").update(sentCookie).digest("hex");

  const existing = inflight.get(key);
  if (existing) return existing; // koi aur pehle se refresh kar raha hai, uska intezaar karo

  const p = (async () => {
    const res = await call(REFRESH_PATH, {
      method: "POST",
      headers: { Cookie: sentCookie },
    });

    if (res.status === 400 || res.status === 401 || res.status === 403) {
      throw new Unauthorized("Refresh token invalid ya expire");
    }
    // 5xx / network wali dikkat par logout mat karao, alag error do
    if (!res.ok) throw new Error(`Refresh service error: ${res.status}`);

    return res.headers.getSetCookie();
  })();

  inflight.set(key, p);

  p.then(
    // success: thodi der result share karo, phir hata do
    () => void setTimeout(() => inflight.delete(key), SHARE_WINDOW_MS).unref?.(),
    // fail: turant hata do, taaki agli baar dobara try ho sake
    () => inflight.delete(key),
  );

  return p;
}

async function refreshWith(jar: Jar, sentCookie: string): Promise<Jar> {
  const setCookies = await refreshShared(sentCookie);
  await setCookiesFromResponse(setCookies, jar); // jar + browser dono update
  return jar;
}

export async function refresh(): Promise<Jar> {
  const jar = await getJar();
  return refreshWith(jar, toHeader(jar));
}

export async function fetchApi(
  path: string,
  init: ApiInit = {},
): Promise<Response> {
  const jar = await getJar();
  const sent = toHeader(jar); // is call ne jo cookies bheji, unko yaad rakho

  const res = await call(path, withCookies(init, jar));
  if (res.status !== 401) return res;

  // Agar is beech koi aur call jar ko refresh kar chuka hai, dobara refresh mat karo
  const freshJar = toHeader(jar) !== sent ? jar : await refreshWith(jar, sent);

  const retry = await call(path, withCookies(init, freshJar));
  if (retry.status === 401) throw new Unauthorized();
  return retry;
}