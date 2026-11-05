import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Skeleton className="aspect-square w-full rounded-none" />

      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4" />   {/* naam */}
        <Skeleton className="h-4 w-full" />  {/* description */}
        <Skeleton className="h-6 w-1/3" />   {/* price */}
        <Skeleton className="h-11 w-full" /> {/* Add to Cart button */}
      </div>
    </div>
  )
}