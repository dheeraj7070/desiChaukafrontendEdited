import type Product from "@/types/product"
import type { Variant } from "@/types/product"

export const isBuyable = (v: Variant) =>
  v.status === "active"

export type CardAction =
  | { type: "direct"; variantId: string, productId:string }
  | { type: "choose" }
  | { type: "unavailable" }

export function getCardAction(p: Product): CardAction {
  const buyable = (p.variants ?? []).filter(isBuyable)
  if (buyable.length === 0) return { type: "unavailable"}
  if (buyable.length === 1) return { type: "direct", variantId: buyable[0].id, productId: buyable[0].productId }
  return { type: "choose" }
}

// Card pe "From ₹X" dikhane ke liye
export function getPriceInfo(p: Product) {
  const active = (p.variants ?? []).filter((v) => v.status === "active")
  if (active.length === 0) return { priceMinor: p.priceMinor, isRange: false }

  const prices = active.map((v) => v.priceMinor)
  const min = Math.min(...prices)
  return { priceMinor: min, isRange: new Set(prices).size > 1 }
}