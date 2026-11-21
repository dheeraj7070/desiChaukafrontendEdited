// components/reviews/review-skeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ReviewCardSkeleton() {
  return (
    <Card className="shadow-none">
      <CardContent className="space-y-3 p-5">
        {/* stars + date */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="size-4 rounded-sm" />
            ))}
          </div>
          <Skeleton className="h-3 w-20" />
        </div>

        {/* title */}
        <Skeleton className="h-5 w-2/5" />

        {/* comment lines */}
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-11/12" />
          <Skeleton className="h-3.5 w-3/5" />
        </div>
      </CardContent>
    </Card>
  );
}

type ReviewListSkeletonProps = {
  count?: number;
};

export function ReviewListSkeleton({ count = 3 }: ReviewListSkeletonProps) {
  return (
    <div
      className="grid gap-4"
      role="status"
      aria-busy="true"
      aria-label="Loading reviews"
    >
      {Array.from({ length: count }, (_, i) => (
        <ReviewCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading reviews...</span>
    </div>
  );
}