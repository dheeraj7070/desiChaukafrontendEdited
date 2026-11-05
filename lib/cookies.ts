// /lib/cookies.ts
import "server-only";
import { cookies } from "next/headers";
import { parse } from "set-cookie-parser";

export type Jar = Map<string, string>;

export async function setCookiesFromResponse(
  source: Response | string[],
  jar?: Jar,
) {
  const raw = Array.isArray(source) ? source : source.headers.getSetCookie();
  const incoming = parse(raw);

  if (jar) {
    for (const c of incoming) {
      const expired =
        c.maxAge === 0 || (c.expires && c.expires.getTime() <= Date.now());
      if (expired) jar.delete(c.name);
      else jar.set(c.name, c.value);
    }
  }

  try {
    const store = await cookies();
    for (const c of incoming) {
      store.set(c.name, c.value, {
        httpOnly: c.httpOnly,
        secure: c.secure,
        sameSite: c.sameSite?.toLowerCase() as
          | "lax"
          | "strict"
          | "none"
          | undefined,
        path: c.path ?? "/",
        expires: c.expires,
        maxAge: c.maxAge,
      });
    }
  } catch {
    // Server Component mein cookie set nahi hoti, ignore
  }
}

export async function deleteCookie(key: string) {
  const store = await cookies();
  store.delete(key);
}
