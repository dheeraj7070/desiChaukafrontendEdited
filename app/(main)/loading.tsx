import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-7xl px-4 pt-6 pb-16 lg:px-8"
      aria-busy="true"
      aria-label="Loading product"
    >
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* Gallery */}
        <div className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="hidden gap-2 sm:flex">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="size-20 shrink-0 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div className="flex flex-col">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-10 w-4/5" />
          <Skeleton className="mt-2 h-10 w-2/5 sm:hidden" />

          {/* Price card */}
          <div className="mt-5 rounded-xl border p-4">
            <div className="flex items-baseline gap-3">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-7 w-20" />
            </div>
            <Skeleton className="mt-3 h-4 w-24" />
          </div>

          {/* Description */}
          <div className="mt-5 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Pack size */}
          <Skeleton className="mt-5 h-4 w-20" />
          <Skeleton className="mt-2 h-9 w-32 rounded-full" />

          {/* Quantity + cart */}
          <div className="mt-8 flex items-center gap-3">
            <Skeleton className="h-12 w-32 rounded-full" />
            <Skeleton className="h-12 flex-1 rounded-full" />
            <Skeleton className="size-12 rounded-full" />
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-11 rounded-lg" />
            ))}
          </div>

          {/* Info sections */}
          <div className="mt-8 space-y-px">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-none" />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}