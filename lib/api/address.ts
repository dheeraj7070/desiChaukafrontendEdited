import "server-only"
import { requestEnvelope, type ApiResult } from "@/lib/envelope"
import type { Address, AddressInput } from "@/types/address"

type RawAddress = Address & { userId?: string }

function sanitize(raw: RawAddress): Address {
  const { userId: _userId, ...address } = raw
  return address
}

const JSON_HEADERS = { "Content-Type": "application/json" }

type Payload = Partial<AddressInput> & { country?: string }

/** GET /user/address - default pehle, phir naye */
export async function fetchAddresses(): Promise<ApiResult<Address[]>> {
  const res = await requestEnvelope<RawAddress[]>("/user/address")
  if (!res.ok) return res
  return { ok: true, data: res.data.map(sanitize) }
}

/** POST /user/address - pehla address apne aap default ban jaata hai */
export async function createAddress(payload: Payload): Promise<ApiResult<Address>> {
  const res = await requestEnvelope<RawAddress>("/user/address", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  })
  if (!res.ok) return res
  return { ok: true, data: sanitize(res.data) }
}

/** PATCH /user/address/:id - sirf bheje gaye fields badalte hain */
export async function patchAddress(
  id: string,
  payload: Payload,
): Promise<ApiResult<Address>> {
  const res = await requestEnvelope<RawAddress>(`/user/address/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  })
  if (!res.ok) return res
  return { ok: true, data: sanitize(res.data) }
}

/** DELETE /user/address/:id */
export function removeAddress(id: string): Promise<ApiResult<unknown>> {
  return requestEnvelope<unknown>(`/user/address/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
}
