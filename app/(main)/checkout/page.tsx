import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { fetchCheckout } from "@/lib/api/checkout"
import { CheckoutErrorState } from "@/app/(main)/section/checkout/CheckoutErrorState"
import { CheckoutView } from "@/app/(main)/section/checkout/CheckoutView"

// User-specific + stock/price live - kabhi cache nahi
export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Checkout" }

export default async function CheckoutPage() {
  const res = await fetchCheckout()

  if (!res.ok && res.code === "UNAUTHORIZED") redirect("/login?next=/checkout")

  if (!res.ok) {
    return (
      <div className="container mx-auto max-w-6xl px-4">
        <CheckoutErrorState message={res.message} />
      </div>
    )
  }

  // Order sirf cart ke items se banta hai - cart khaali to wapas cart par
  if (res.data.items.length === 0) redirect("/cart")

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Checkout</h1>
        <p className="mt-1 text-muted-foreground">
          Address aur payment chuno, phir order place karo.
        </p>
      </header>

      <CheckoutView data={res.data} />
    </div>
  )
}
