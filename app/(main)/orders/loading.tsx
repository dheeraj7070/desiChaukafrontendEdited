import { OrderListSkeleton } from "@/app/(main)/section/orders/OrderListSkeleton"

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <OrderListSkeleton />
    </main>
  )
}
