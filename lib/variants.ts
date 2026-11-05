// lib/variants.ts
// Saara variant logic yahan hai. Koi React nahi, isliye test karna aasaan hai.
import type { Variant } from "@/types/product"

export type OptionGroup = { key: string; label: string; values: string[] }

// Sirf bikne wale variants
export const getActiveVariants = (variants: Variant[]) =>
  variants.filter((v) => v.status === "active")

// packSize -> "Pack size"
export function humanize(key: string) {
  const s = key.replace(/([A-Z])/g, " $1").trim().toLowerCase()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Variants se option groups banao: [{ key: "packSize", values: ["250g", "500g"] }]
export function getOptionGroups(variants: Variant[]): OptionGroup[] {
  const map = new Map<string, Set<string>>()
  for (const v of variants) {
    for (const [key, value] of Object.entries(v.options)) {
      if (!map.has(key)) map.set(key, new Set())
      map.get(key)!.add(value)
    }
  }
  return [...map].map(([key, values]) => ({
    key,
    label: humanize(key),
    values: [...values],
  }))
}

// Selection ({ packSize: "500g" }) se exact variant dhundo
export function findVariant(
  variants: Variant[],
  selection: Record<string, string>,
) {
  return variants.find((v) =>
    Object.entries(selection).every(([k, val]) => v.options[k] === val),
  )
}

// URL ka id sahi ho to wo variant, warna default (pehla active)
export function resolveVariant(variants: Variant[], id?: string) {
  return variants.find((v) => v.id === id) ?? variants[0]
}

// Is option ko chunne par koi variant banta hai ya nahi (button disable ke liye)
export function isOptionAvailable(
  variants: Variant[],
  selection: Record<string, string>,
  key: string,
  value: string,
) {
  return !!findVariant(variants, { ...selection, [key]: value })
}

// Stock sirf tab check hota hai jab backend bheje. Nahi bheja to bikne wala maano.
export const isSoldOut = (v?: Variant) => v?.stock != null && v.stock <= 0

// Card ke liye "From ₹X". Variants khali ho to null.
export function getPriceRange(variants: Variant[]) {
  if (variants.length === 0) return null
  const prices = variants.map((v) => v.priceMinor)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}
