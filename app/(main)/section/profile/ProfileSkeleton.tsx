export function ProfileSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading profile">
      <div className="h-48 animate-pulse rounded-xl bg-primary/20" />
      <div className="space-y-4">
        <div className="h-7 w-44 animate-pulse rounded bg-muted" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-52 animate-pulse rounded-xl bg-muted" />
          <div className="h-52 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  )
}
