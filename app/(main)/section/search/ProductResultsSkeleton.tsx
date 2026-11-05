export function ProductResultsSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading products">
      <div className="flex items-center justify-between">
        <div className="h-7 w-56 animate-pulse rounded bg-muted" />
        <div className="h-9 w-40 animate-pulse rounded bg-muted" />
      </div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i} className="space-y-3">
            <div className="aspect-square animate-pulse rounded-xl bg-muted" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
          </li>
        ))}
      </ul>
    </div>
  )
}
