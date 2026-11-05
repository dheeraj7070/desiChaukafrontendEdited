"use server"

import { fetchHome } from "@/lib/api/home"
import type { ApiResult } from "@/lib/envelope"
import type { HomeData } from "@/types/home"

export async function getHomeData(): Promise<ApiResult<HomeData>> {
  return fetchHome()
}
