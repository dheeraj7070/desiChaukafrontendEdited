import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageSkeleton() {
  return (
    <main
      className="mx-auto w-full max-w-7xl px-4 pt-6 pb-16 lg:px-8"
      aria-busy="true"
      aria-label="Loading product"
    >
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="size-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="size-4" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-lg" />
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div className="flex flex-col">
          {/* Brand */}
          <Skeleton className="h-3 w-24" />
          {/* Title */}
          <Skeleton className="mt-3 h-9 w-3/4 sm:h-10" />

          {/* Price */}
          <div className="mt-5 rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-baseline gap-3">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-7 w-20" />
            </div>
            <Skeleton className="mt-2 h-4 w-32" />
          </div>

          {/* Description */}
          <div className="mt-5 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Pack size */}
          <div className="mt-5">
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>

          {/* Purchase (quantity + buttons) */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 min-w-40 flex-1 rounded-lg" />
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2.5"
              >
                <Skeleton className="size-5 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>

          {/* Info sections */}
          <div className="mt-8">
            <div className="border-y py-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="size-5" />
              </div>
              <div className="mt-4 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[110px_1fr] gap-4 sm:grid-cols-[150px_1fr]"
                  >
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-b py-4">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-16">
        <Skeleton className="mb-6 h-7 w-56" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
