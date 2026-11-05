import 'server-only';
import { buildUrl, withTimeout } from "./http";
import { ApiError } from "@/types/Api";
import { AppError } from "./AppError";

export async function publicApi<T>(
  path: string,
  init?: RequestInit & { params?: Record<string, string> },
  opts?: { revalidate: number; tags: string[] },
): Promise<Response> {
  const url = buildUrl(path, init?.params);
  const res = await fetch(url, {
    next: opts && { revalidate: opts.revalidate, tags: opts.tags },
    ...init,
    signal: withTimeout(5000),
  });

  if (!res.ok) {
    const data = await res.json<ApiError>();

    throw new AppError(data.error.code);
  }
  return res;
}


export async function publicApi2(
  path: string,
  init?: RequestInit & { params?: Record<string, string> },
  opts?: { revalidate: number; tags: string[] },
): Promise<Response> {
  const url = buildUrl(path, init?.params);
  const res = await fetch(url, {
    next: opts && { revalidate: opts.revalidate, tags: opts.tags },
    ...init,
    signal: withTimeout(5000),
  });
  return res;
}
