// Sirf browser mein use hota hai (Razorpay Checkout.js)

export type RazorpaySuccess = {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export type RazorpayFailure = {
  error: { code?: string; description?: string; reason?: string }
}

export type RazorpayOptions = {
  key: string
  order_id: string
  amount: number
  currency: string
  name: string
  description?: string
  prefill?: { name?: string; contact?: string; email?: string }
  handler: (response: RazorpaySuccess) => void
  modal?: { ondismiss?: () => void }
}

type RazorpayInstance = {
  open: () => void
  on: (event: "payment.failed", cb: (response: RazorpayFailure) => void) => void
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance
  }
}

const SRC = "https://checkout.razorpay.com/v1/checkout.js"
let loading: Promise<boolean> | null = null

export function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false)
  if (window.Razorpay) return Promise.resolve(true)

  loading ??= new Promise<boolean>((resolve) => {
    const script = document.createElement("script")
    script.src = SRC
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => {
      loading = null // agli baar dobara try ho sake
      resolve(false)
    }
    document.body.appendChild(script)
  })
  return loading
}
