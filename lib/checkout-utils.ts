import type { CheckoutData, CheckoutItem } from "@/types/checkout"

/** Item mein koi dikkat ho to uska message, warna null */
export function itemIssue(item: CheckoutItem): string | null {
  if (!item.availableForPurchase) return "Ye item ab available nahi hai"
  if (!item.inStock || item.availableStock <= 0) return "Stock khatam ho gaya"
  if (item.quantity > item.availableStock) return `Sirf ${item.availableStock} bache hain`
  return null
}

export function hasCartIssues(data: Pick<CheckoutData, "items" | "hasUnavailableItems">): boolean {
  return data.hasUnavailableItems || data.items.some((i) => itemIssue(i) !== null)
}

/** (compareAt - price) * qty ka jod */
export function totalSavingsMinor(items: CheckoutItem[]): number {
  return items.reduce((sum, i) => {
    return i.compareAtPriceMinor && i.compareAtPriceMinor > i.priceMinor
      ? sum + (i.compareAtPriceMinor - i.priceMinor) * i.quantity
      : sum
  }, 0)
}
