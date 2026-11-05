//lib/session
import "server-only";
import { cookies } from "next/headers";
import type { Token } from "@/types/Api";
import { parseSetCookie, Cookie as pCookie } from "set-cookie-parser";

const ACCESS_KEY = process.env.ACCESS_TOKEN_KEY ?? "access_token";
const REFRESH_KEY = process.env.REFRESH_TOKEN_KEY ?? "refresh_token";

const ACCESS_MAX_AGE = 60 * 15; // 15 minute
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // 7 din

const baseOptions = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
} as const;

export async function getSession(): Promise<Token> {
  const store = await cookies();
  // console.log({ ACCESS_KEY, REFRESH_KEY });
  const storedCookies = {
    accessToken: store.get(ACCESS_KEY)?.value,
    refreshToken: store.get(REFRESH_KEY)?.value,
  };
  // console.log(storedCookies);
  return storedCookies;
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ACCESS_KEY);
  store.delete(REFRESH_KEY);
}

export function parseCookies(header: Headers) {
  const rawCookies = parseSetCookie(header.getSetCookie(), {
    map: false,
  });
  return rawCookies;
}

export async function parseAndSetCookie(header: Headers) {
  const c =  parseCookies(header);
  const store = await cookies();
  c.forEach(({ name, value, sameSite, ...opts }) =>
    store.set(name, value, {
      ...opts,
      // sameSite: sameSite?.toLowerCase() as SameSite | undefined,
    }),
  );
}

// export async function getAccessToken() {
//   return (await getSession()).accessToken;
// }

// export async function getRefreshToken() {
//   return (await getSession()).refreshToken;
// }

// Sirf Server Action / Route Handler mein
// export async function setSession(accessToken: string, refreshToken: string) {
//   const store = await cookies();
//   store.set(ACCESS_KEY, accessToken, {
//     ...baseOptions,
//     maxAge: ACCESS_MAX_AGE,
//   });
//   store.set(REFRESH_KEY, refreshToken, {
//     ...baseOptions,
//     maxAge: REFRESH_MAX_AGE,
//   });
// }

// Sirf Server Action / Route Handler mein

export async function setCookie(key: string, value: string) {
  const store = await cookies();
  const c = store.set(key, value, {
    ...baseOptions,
    secure: false,
    maxAge: 60 * 4,
  });
  // (c);
}

export async function getCookie(key: string) {
  const store = await cookies();
  return store.get(key);
}
