import { OrderDetailSkeleton } from "@/app/(main)/section/orders/OrderDetailSkeleton"

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <OrderDetailSkeleton />
    </main>
  )
}
