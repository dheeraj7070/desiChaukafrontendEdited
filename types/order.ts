// Known values, lekin backend naye status bhej sakta hai - isliye `string & {}` fallback.
export type OrderStatus =
  | "pending_payment"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded"
  | (string & {})

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | (string & {})
export type PaymentMethod = "razorpay" | "cod" | (string & {})

export type OrderAddress = {
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
  addressType: string
}

export type OrderItem = {
  id: string
  orderId: string
  productId: string
  variantId: string | null
  name: string
  sku: string
  options: Record<string, string> | null
  /** paise */
  unitPriceMinor: number
  quantity: number
  /** paise */
  lineTotalMinor: number
  createdAt: string
  thumbnail: string | null
}

/**
 * Client ko jaane wala order. userId aur Razorpay IDs lib/api/orders.ts mein hata diye jaate hain.
 * Saare paise wale fields minor units (paise) mein hain.
 */
export type Order = {
  id: string
  orderNumber: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  subtotalMinor: number
  shippingMinor: number
  totalMinor: number
  currency: string
  shippingProvider: string | null
  trackingNumber: string | null
  trackingUrl: string | null
  shippedAt: string | null
  deliveredAt: string | null
  returnWindowEndsAt: string | null
  remarks: string | null
  refundedAt: string | null
  /** (sic) backend ki spelling */
  refundRefrence: string | null
  expiresAt: string | null
  createdAt: string
  updatedAt: string
  shippingAddress: OrderAddress
  items: OrderItem[]
}

export type OrderPagination = {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasMore: boolean
  nextPage: number | null
}

export type OrderListData = {
  orders: Order[]
  pagination: OrderPagination
}

export type OrderListQuery = {
  /** 1+ */
  page?: number
  /** 1-50, default 20 */
  limit?: number
}
