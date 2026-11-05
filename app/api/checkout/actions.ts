"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { placeOrder } from "@/lib/api/checkout"
import { verifyPayment } from "@/lib/api/payments"
import type { ApiResult } from "@/lib/envelope"
import type {
  PlaceOrderData,
  PlaceOrderInput,
  VerifyPaymentInput,
} from "@/types/checkout"

// Doc mein codes kabhi "CART IS EMPTY" jaise likhe hain, kabhi underscore ke saath - dono chalenge
function normalize(code: string): string {
  return code.trim().toUpperCase().replace(/[\s-]+/g, "_")
}

function friendly(code: string, fallback: string): string {
  switch (code) {
    case "UNAUTHORIZED":
      return "Session khatam ho gaya. Dobara login karo."
    case "CART_IS_EMPTY":
      return "Cart khaali hai. Pehle products add karo."
    case "ITEM_UNAVAILABLE":
      return "Cart mein koi item ab available nahi hai. Cart check karo."
    case "OUT_OF_STOCK":
      return "Kuchh items ka stock kam hai. Cart mein quantity check karo."
    case "NOT_FOUND":
      return "Ye address nahi mila. Koi aur saved address chuno."
    case "PAYMENT_INIT_FAILED":
      return "Payment shuru nahi ho paayi. Thodi der baad dobara try karo."
    case "VALIDATION_ERROR":
      return "Address ya payment method sahi nahi hai."
    default:
      return fallback
  }
}

function fail(code: string, message: string): { ok: false; code: string; message: string } {
  const c = normalize(code)
  return { ok: false, code: c, message: friendly(c, message) }
}

// Redirect se pehle cart/orders ka cache saaf (redirect ke baad naya data dikhe)
function refreshAfterOrder() {
  revalidatePath("/cart")
  revalidatePath("/orders")
  revalidatePath("/", "layout")
}

const METHODS = new Set(["razorpay", "cod"])
const clean = (v: unknown, max = 200) =>
  typeof v === "string" && v.trim() !== "" && v.length <= max ? v.trim() : null

/**
 * COD: order confirm hote hi seedha order page par redirect (yahan se kuchh return nahi hota).
 * Razorpay: order + razorpayOrderId wapas aata hai, client payment popup kholta hai.
 */
export async function placeOrderAction(
  input: PlaceOrderInput,
): Promise<ApiResult<PlaceOrderData>> {
  const addressId = clean(input?.addressId, 100)
  if (!addressId || !METHODS.has(input?.paymentMethod)) {
    return fail("VALIDATION_ERROR", "Invalid request.")
  }

  const res = await placeOrder({ addressId, paymentMethod: input.paymentMethod })
  console.log(res);
  if (!res.ok) return fail(res.code, res.message)

  if (res.data.paymentMethod === "cod") {
    refreshAfterOrder()
    redirect(`/orders/${encodeURIComponent(res.data.orderNumber)}?placed=cod`)
  }
  return res
}

/** Razorpay popup ke success ke baad: signature server par verify, phir order page */
export async function verifyPaymentAction(
  input: VerifyPaymentInput,
): Promise<ApiResult<null>> {
  const orderId = clean(input?.orderId, 100)
  const razorpayOrderId = clean(input?.razorpayOrderId)
  const razorpayPaymentId = clean(input?.razorpayPaymentId)
  const razorpaySignature = clean(input?.razorpaySignature, 500)
  if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return fail("VALIDATION_ERROR", "Invalid payment response.")
  }

  const res = await verifyPayment({
    orderId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  })
  if (!res.ok) return fail(res.code, res.message)

  refreshAfterOrder()
  redirect(`/orders/${encodeURIComponent(orderId)}?placed=paid`)
}
