import type { Address } from "@/types/address"

export type PaymentMethodId = "razorpay" | "cod"

export type CheckoutItem = {
  id: string
  productId: string
  variantId: string | null
  productName: string
  productSlug: string
  sku: string
  options: Record<string, string> | null
  quantity: number
  priceMinor: number
  compareAtPriceMinor: number | null
  lineTotalMinor: number
  availableForPurchase: boolean
  thumbnail: string | null
  availableStock: number
  inStock: boolean
}

/** GET /orders/checkout - sab paise minor units (paise) mein */
export type CheckoutData = {
  cartId: string
  items: CheckoutItem[]
  itemCount: number
  addresses: Address[]
  defaultAddress: Address | null
  subtotalMinor: number
  shippingMinor: number
  totalMinor: number
  currency: string
  freeShippingApplied: boolean
  freeShippingThresholdMinor: number
  shippingFeeMinor: number
  amountForFreeShippingMinor: number
  hasUnavailableItems: boolean
  paymentMethods: string[]
}

export type PlaceOrderInput = {
  addressId: string
  paymentMethod: PaymentMethodId
}

/** POST /checkout */
export type PlaceOrderData = {
  orderId: string
  orderNumber: string
  paymentMethod: string
  subtotalMinor: number
  shippingMinor: number
  totalMinor: number
  /** COD mein null */
  razorpayOrderId: string | null
  razorpayKeyId: string | null
}

export type VerifyPaymentInput = {
  orderId: string
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
}
