"use server"

import { revalidatePath } from "next/cache"
import { createAddress, patchAddress, removeAddress } from "@/lib/api/address"
import { parseAddressForm } from "@/lib/address-schema"
import type { AddressActionResult, AddressFormState } from "@/types/address"

// Profile aur checkout dono isi actions ko use karte hain
function refresh() {
  revalidatePath("/profile")
  revalidatePath("/checkout")
}

function friendlyMessage(code: string, message: string): string {
  switch (code) {
    case "UNAUTHORIZED":
      return "Session khatam ho gaya. Dobara login karo."
    case "INVALID_REFERENCE":
      return "Ye address kisi order mein use ho chuka hai, isliye delete nahi ho sakta."
    case "ADDRESS_NOT_FOUND":
    case "INVALID_ADDRESS_ID":
      return "Ye address ab maujood nahi hai. Page refresh karke dekho."
    case "INVALID_ADDRESS":
      return "Address ki details sahi nahi hain. Check karke dobara try karo."
    default:
      return message
  }
}

/** useActionState ke liye: (prevState, formData) */
export async function createAddressAction(
  _prev: AddressFormState,
  formData: FormData,
): Promise<AddressFormState> {
  const parsed = parseAddressForm(formData)
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Form mein kuchh galtiyan hain.",
      fieldErrors: parsed.fieldErrors,
      values: parsed.values,
    }
  }

  const res = await createAddress({ ...parsed.data, country: "India" })
  if (!res.ok) {
    const values = Object.fromEntries(
      [...formData.entries()].filter(([, v]) => typeof v === "string"),
    ) as Record<string, string>
    return { status: "error", message: friendlyMessage(res.code, res.message), values }
  }

  refresh()
  return { status: "success", message: "Address save ho gaya", address: res.data }
}

/** `updateAddressAction.bind(null, id)` karke useActionState mein daalo */
export async function updateAddressAction(
  id: string,
  _prev: AddressFormState,
  formData: FormData,
): Promise<AddressFormState> {
  const parsed = parseAddressForm(formData)
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Form mein kuchh galtiyan hain.",
      fieldErrors: parsed.fieldErrors,
      values: parsed.values,
    }
  }

  // isDefault:false bhejne se kisi user ke paas koi default hi nahi bachta,
  // isliye form sirf "default banao" (true) bhejta hai. Default hatane ke liye dusra address default karo.
  const { isDefault, ...rest } = parsed.data
  const res = await patchAddress(id, {
    ...rest,
    country: "India",
    ...(isDefault ? { isDefault: true } : {}),
  })
  if (!res.ok) {
    const values = Object.fromEntries(
      [...formData.entries()].filter(([, v]) => typeof v === "string"),
    ) as Record<string, string>
    return { status: "error", message: friendlyMessage(res.code, res.message), values }
  }

  refresh()
  return { status: "success", message: "Address update ho gaya", address: res.data }
}

export async function setDefaultAddressAction(id: string): Promise<AddressActionResult> {
  if (!id) return { ok: false, message: "Address nahi mila." }
  const res = await patchAddress(id, { isDefault: true })
  if (!res.ok) return { ok: false, message: friendlyMessage(res.code, res.message) }
  refresh()
  return { ok: true, message: "Default address badal gaya" }
}

export async function deleteAddressAction(id: string): Promise<AddressActionResult> {
  if (!id) return { ok: false, message: "Address nahi mila." }
  const res = await removeAddress(id)
  if (!res.ok) return { ok: false, message: friendlyMessage(res.code, res.message) }
  refresh()
  return { ok: true, message: "Address delete ho gaya" }
}
