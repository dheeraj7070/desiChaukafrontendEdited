export function OrderListSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading orders">
      <div className="h-8 w-40 animate-pulse rounded bg-muted" />
      <ul className="space-y-4">
        {[0, 1, 2].map((i) => (
          <li key={i} className="overflow-hidden rounded-xl border">
            <div className="h-14 animate-pulse bg-muted/60" />
            <div className="flex items-center gap-4 p-4">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((t) => (
                  <div key={t} className="size-14 animate-pulse rounded-lg border-2 border-background bg-muted" />
                ))}
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
