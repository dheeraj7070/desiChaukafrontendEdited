import "server-only"
import { requestEnvelope, type ApiResult } from "@/lib/envelope"
import type { VerifyPaymentInput } from "@/types/checkout"

/**
 * ASSUMPTION: checkout doc mein payment verify ka endpoint nahi diya.
 * Maine POST /payments/verify aur ye body maani hai - apne backend ke hisaab se yahin badlo.
 * Agar tumhara backend sirf Razorpay webhook se confirm karta hai, to ye call fail hoga
 * aur UI "confirm hone mein thoda time lag sakta hai" dikhayega (order phir bhi sahi rehta hai).
 */
export function verifyPayment(input: VerifyPaymentInput): Promise<ApiResult<unknown>> {
  return requestEnvelope<unknown>("/payments/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: input.orderId,
      razorpayOrderId: input.razorpayOrderId,
      razorpayPaymentId: input.razorpayPaymentId,
      razorpaySignature: input.razorpaySignature,
    }),
  })
}
