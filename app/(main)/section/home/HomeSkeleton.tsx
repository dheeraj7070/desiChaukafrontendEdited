export function HomeSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-6 md:px-6">
      {[0, 1].map((s) => (
        <div key={s} className="space-y-4">
          <div className="h-7 w-48 animate-pulse rounded bg-muted" />
          <div className="flex gap-4 overflow-hidden">
            {[0, 1, 2, 3, 4].map((c) => (
              <div
                key={c}
                className="aspect-[3/4] w-[46%] shrink-0 animate-pulse rounded-xl bg-muted sm:w-[31%] md:w-[23.5%] lg:w-[19%]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
