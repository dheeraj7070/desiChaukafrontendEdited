export const ADDRESS_TYPES = ["home", "work", "other"] as const
export type AddressType = (typeof ADDRESS_TYPES)[number]

/** Backend ka address (userId client tak nahi jaata) */
export type Address = {
  id: string
  fullName: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  landmark: string | null
  city: string
  state: string
  postalCode: string
  country: string
  addressType: AddressType | (string & {})
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

/** Form se aane wala validated data (country server action mein jodta hai) */
export type AddressInput = {
  fullName: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  landmark: string | null
  addressType: AddressType
  city: string
  state: string
  postalCode: string
  isDefault: boolean
}

export type AddressFieldName = Exclude<keyof AddressInput, "isDefault">

export type AddressFormState = {
  status: "idle" | "error" | "success"
  message?: string
  fieldErrors?: Partial<Record<AddressFieldName, string>>
  /** Error aane par user ka likha hua wapas bharne ke liye */
  values?: Record<string, string>
  address?: Address
}

export type AddressActionResult =
  | { ok: true; message?: string }
  | { ok: false; message: string }
