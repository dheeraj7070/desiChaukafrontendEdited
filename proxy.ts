// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { parse } from "set-cookie-parser";

const ACCESS_COOKIE = "__Host-customer_access";
const REFRESH_COOKIE = "__Host-customer_refresh";
const REFRESH_PATH = "/refresh_access_token";

// Sirf inhi routes (aur unke sub-routes) ke liye login zaroori hai.
// "/cart" likhne se "/cart" aur "/cart/..." dono cover ho jaate hain.
const PROTECTED_ROUTES = [
  "/profile",
  "/cart",
  "/checkout",
  "/order",
  "/logout",
];

// Logged-in user ko ye pages dikhane ka koi matlab nahi
const AUTH_ROUTES = ["/login", "/login/verify", "/register"];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

/**
 * Redirects to /login.
 * clearCookies=true sirf tab, jab refresh token sach mein invalid ho (401/403).
 * __Host- cookies hatane ke liye wahi attributes chahiye jo set karte waqt the:
 * Secure, Path=/, aur Domain nahi.
 */
function redirectToLogin(
  request: NextRequest,
  { clearCookies = false }: { clearCookies?: boolean } = {},
) {
  const response = NextResponse.redirect(new URL("/login", request.url));

  if (clearCookies) {
    for (const name of [ACCESS_COOKIE, REFRESH_COOKIE]) {
      response.cookies.set(name, "", {
        path: "/",
        secure: true,
        httpOnly: true,
        maxAge: 0,
        expires: new Date(0),
      });
    }
  }

  return response;
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAccess = request.cookies.has(ACCESS_COOKIE);
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  const isAuthRoute = matchesRoute(pathname, AUTH_ROUTES);
  const isProtected = matchesRoute(pathname, PROTECTED_ROUTES);

  // Case A: access cookie hai
  if (hasAccess) {
    // logged-in user ko login/register dikhane ka koi matlab nahi
    if (isAuthRoute) return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
  }

  // Access nahi hai. Protected nahi hai (home, products, search, login, register...)
  // to hamesha jaane do. Yahan sirf access cookie dekhte hain, isliye
  // stale refresh cookie se loop nahi banta.
  if (!isProtected) return NextResponse.next();

  // --- yahan se sirf protected routes ---

  // Case C: kuch nahi hai
  if (!refreshToken) return redirectToLogin(request);

  // Case B: access nahi, refresh hai -> refresh try karo
  const apiBase = process.env.API;
  if (!apiBase) {
    // fail closed: config galat ho toh chupchaap andar mat jaane do
    console.error("proxy: API env variable is missing");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  let res: Response;
  try {
    res = await fetch(new URL(REFRESH_PATH, apiBase), {
      method: "POST",
      headers: {
        Cookie: `${REFRESH_COOKIE}=${encodeURIComponent(refreshToken)}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
  } catch (error) {
    // network error / timeout: token theek ho sakta hai, cookies mat hatao
    console.error("proxy: refresh request failed", error);
    return redirectToLogin(request);
  }

  // Token sach mein invalid: cookies hatao, warna /login se loop ban sakta hai
  if (res.status === 401 || res.status === 403) {
    return redirectToLogin(request, { clearCookies: true });
  }

  // 5xx jaise server problems: user ko logout mat karo
  if (!res.ok) {
    console.error("proxy: refresh failed with status", res.status);
    return redirectToLogin(request);
  }

  const fresh = parse(res.headers.getSetCookie());
  if (fresh.length === 0) {
    // backend ne OK bola par cookies nahi di: ise failure maano
    return redirectToLogin(request, { clearCookies: true });
  }

  // 1) Isi request ka Server Component naya token dekhe
  const merged = new Map(
    request.cookies.getAll().map((c) => [c.name, c.value]),
  );
  for (const c of fresh) merged.set(c.name, c.value);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "cookie",
    [...merged].map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("; "),
  );

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // 2) Browser mein cookie save ho
  for (const c of fresh) {
    response.cookies.set(c.name, c.value, {
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

  return response;
}

export const config = {
  // static files, images aur favicon par proxy mat chalao
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};