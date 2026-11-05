import { CheckoutSkeleton } from "@/app/(main)/section/checkout/CheckoutSkeleton"

export default function Loading() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-8 h-9 w-48 animate-pulse rounded bg-muted" />
      <CheckoutSkeleton />
    </div>
  )
}
