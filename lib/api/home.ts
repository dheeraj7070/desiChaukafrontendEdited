import "server-only"
import { publicRequestEnvelope, type ApiResult } from "@/lib/envelope"
import type { HomeData } from "@/types/home"

/**
 * GET /home  (public, no auth)
 * Backend 60s cache karta hai (max-age=60, swr=300).
 */
export function fetchHome(): Promise<ApiResult<HomeData>> {
  return publicRequestEnvelope<HomeData>("/home")
}
