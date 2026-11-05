import "server-only";
import { ApiInit } from "@/types/Api";


export function buildUrl(path: string, params: ApiInit["params"] = {}) {
  const url = new URL(path, process.env.API);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return url;
}

export const withTimeout = (ms = 8000) => AbortSignal.timeout(ms);
