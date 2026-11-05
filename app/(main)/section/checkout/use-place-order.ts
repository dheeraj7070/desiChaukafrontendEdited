"use client"

import { useCallback, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { placeOrderAction, verifyPaymentAction } from "@/app/api/checkout/actions"
import { loadRazorpay } from "@/lib/razorpay"
import type { PaymentMethodId } from "@/types/checkout"

export type PlaceError = { code: string; message: string }

type PlaceArgs = {
  addressId: string
  paymentMethod: PaymentMethodId
  /** Razorpay popup mein pehle se bharne ke liye */
  prefill: { name: string; contact: string }
}

// Inme cart dobara dekhna padta hai
const CART_CODES = new Set(["CART_IS_EMPTY", "ITEM_UNAVAILABLE", "OUT_OF_STOCK"])
export const isCartProblem = (code: string) => CART_CODES.has(code)

export function usePlaceOrder() {
  const router = useRouter()
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState<PlaceError | null>(null)
  const busy = useRef(false) // double-click guard
  const leaving = useRef(false) // order page par ja rahe hain

  const place = useCallback(
    async ({ addressId, paymentMethod, prefill }: PlaceArgs) => {
      if (busy.current) return
      busy.current = true
      setPlacing(true)
      setError(null)

      try {
        // COD success par ye call yahin se redirect kar deta hai (neeche ka code nahi chalta)
        const res = await placeOrderAction({ addressId, paymentMethod })

        if (!res.ok) {
          if (res.code === "UNAUTHORIZED") {
            leaving.current = true
            router.push("/login?next=/checkout")
            return
          }
          setError({ code: res.code, message: res.message })
          if (isCartProblem(res.code)) router.refresh()
          return
        }

        const order = res.data
        if (!order.razorpayOrderId || !order.razorpayKeyId) {
          setError({
            code: "PAYMENT_INIT_FAILED",
            message: "Payment shuru nahi ho paayi. Thodi der baad dobara try karo.",
          })
          return
        }

        const loaded = await loadRazorpay()
        if (!loaded || !window.Razorpay) {
          setError({
            code: "RAZORPAY_LOAD_FAILED",
            message: "Payment window load nahi hui. Internet check karke dobara try karo.",
          })
          return
        }

        const Razorpay = window.Razorpay
        await new Promise<void>((resolve) => {
          const rzp = new Razorpay({
            key: order.razorpayKeyId as string,
            order_id: order.razorpayOrderId as string,
            amount: order.totalMinor,
            currency: "INR",
            name: "Desi Chauka",
            description: `Order ${order.orderNumber}`,
            prefill,
            handler: async (response) => {
              try {
                // Success par ye redirect kar deta hai; fail ho to order page par status dikhega
                const v = await verifyPaymentAction({
                  orderId: order.orderId,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                })
                if (!v.ok) {
                  leaving.current = true
                  toast.info(
                    "Payment mil gayi. Confirm hone mein thoda time lag sakta hai, order page par status dekho.",
                  )
                  router.push(`/orders/${encodeURIComponent(order.orderNumber)}`)
                }
              } finally {
                resolve()
              }
            },
            modal: {
              ondismiss: () => {
                toast.info(
                  "Payment poori nahi hui. Dobara 'Pay' dabaoge to naya order ban jaayega, purana apne aap cancel ho jaayega.",
                )
                resolve()
              },
            },
          })
          rzp.on("payment.failed", (r) => {
            setError({
              code: "PAYMENT_FAILED",
              message: r.error.description ?? "Payment fail ho gayi. Dobara try karo.",
            })
          })
          rzp.open()
        })
      } catch {
        // Server action redirect Next khud sambhalta hai; baaki network errors:
        if (!leaving.current) {
          setError({ code: "NETWORK", message: "Kuchh gadbad ho gayi. Dobara try karo." })
        }
      } finally {
        busy.current = false
        if (!leaving.current) setPlacing(false)
      }
    },
    [router],
  )

  return { placing, error, place }
}
