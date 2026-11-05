import "server-only"
import { requestEnvelope, type ApiResult } from "@/lib/envelope"
import type { Profile } from "@/types/profile"
import { cache } from "react";

/** GET /me (protected), deduplicated within the current server render. */
export const fetchMe = cache((): Promise<ApiResult<Profile>> => {
  return requestEnvelope<Profile>("/me")
});

export const getCurrentUser = cache(async (): Promise<Profile | null> => {
  const res = await fetchMe();
  if(!res.ok) return null;
  return res.data;
});
