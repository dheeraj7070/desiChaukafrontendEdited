"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

const MESSAGES: Record<string, { type: "success" | "info"; text: string }> = {
  cod: { type: "success", text: "Order place ho gaya! Hum jaldi hi ise bhej denge." },
  paid: { type: "success", text: "Payment ho gayi aur order confirm ho gaya!" },
}

/**
 * Checkout ke baad /orders/[id]?placed=cod|paid par toast dikhata hai, phir URL se param hata deta hai.
 * orders/[id]/page.tsx mein <Suspense><OrderPlacedToast /></Suspense> daalo.
 */
export function OrderPlacedToast() {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const shown = useRef(false)
  const key = params.get("placed")

  useEffect(() => {
    if (!key || shown.current) return
    const message = MESSAGES[key]
    if (!message) return
    shown.current = true
    toast[message.type](message.text)
    router.replace(pathname, { scroll: false })
  }, [key, pathname, router])

  return null
}
