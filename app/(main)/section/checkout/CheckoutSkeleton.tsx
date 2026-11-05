export function CheckoutSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8" aria-busy="true" aria-label="Loading checkout">
      <div className="space-y-6">
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
        <div className="h-56 animate-pulse rounded-xl bg-muted" />
      </div>
      <div className="h-80 animate-pulse rounded-xl bg-muted" />
    </div>
  )
}
