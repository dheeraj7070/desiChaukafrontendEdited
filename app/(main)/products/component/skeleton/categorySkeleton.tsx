import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./productCardSkeleton";

export function CategorySkeleton({
  title,
  count = 5,
}: {
  title?: string;
  count?: number;
}) {
  return (
    <section className="mb-12" aria-busy="true" aria-live="polite">
      <header className="mb-6 flex items-end justify-between">
        {title ? (
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
        ) : (
          <Skeleton className="h-8 w-40" />
        )}
        <Skeleton className="h-4 w-16" />
      </header>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      <span className="sr-only">Products load ho rahe hain...</span>
    </section>
  );
}
