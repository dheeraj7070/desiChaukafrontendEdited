import { z } from "zod"
import {
  ADDRESS_TYPES,
  type AddressFieldName,
  type AddressInput,
} from "@/types/address"

// Backend ke addressSchema jaise hi rules. Khaali optional field -> null
// (taaki PATCH mein purani value saaf bhi ho sake).
const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} ${max} akshar se zyada nahi ho sakta`)
    .transform((v) => (v === "" ? null : v))

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Naam kam se kam 2 akshar ka ho")
    .max(100, "Naam bahut lamba hai"),
  phone: z.string().trim().regex(/^[0-9]{10}$/, "10 digit ka phone number daalo"),
  addressLine1: z
    .string()
    .trim()
    .min(3, "Address kam se kam 3 akshar ka ho")
    .max(200, "Address 200 akshar se zyada nahi ho sakta"),
  addressLine2: optionalText(200, "Address line 2"),
  landmark: optionalText(150, "Landmark"),
  addressType: z.enum(ADDRESS_TYPES, { message: "Address ka type chuno" }),
  city: z.string().trim().min(2, "City daalo").max(100, "City ka naam bahut lamba hai"),
  state: z.string().trim().min(2, "State daalo").max(100, "State ka naam bahut lamba hai"),
  postalCode: z.string().trim().regex(/^[0-9]{6}$/, "6 digit ka pincode daalo"),
  isDefault: z.boolean(),
})

const TEXT_FIELDS = [
  "fullName",
  "phone",
  "addressLine1",
  "addressLine2",
  "landmark",
  "addressType",
  "city",
  "state",
  "postalCode",
] as const

export type ParsedAddress =
  | { ok: true; data: AddressInput }
  | {
      ok: false
      fieldErrors: Partial<Record<AddressFieldName, string>>
      values: Record<string, string>
    }

export function parseAddressForm(fd: FormData): ParsedAddress {
  const values: Record<string, string> = {}
  for (const key of TEXT_FIELDS) {
    const v = fd.get(key)
    values[key] = typeof v === "string" ? v : ""
  }

  const result = schema.safeParse({ ...values, isDefault: fd.get("isDefault") === "on" })
  if (result.success) return { ok: true, data: result.data as AddressInput }

  const fieldErrors: Partial<Record<AddressFieldName, string>> = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0] as AddressFieldName | undefined
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
  }
  return { ok: false, fieldErrors, values }
}
