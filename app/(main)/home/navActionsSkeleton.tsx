// NavActionsSkeleton.tsx
export function NavActionsSkeleton() {
  return (
    <div className="ml-auto flex items-center gap-2 lg:gap-3" aria-hidden>
      <div className="hidden size-10 animate-pulse rounded-full bg-muted sm:block lg:h-11 lg:w-24" />
      <div className="size-10 animate-pulse rounded-full bg-muted lg:h-11 lg:w-24" />
    </div>
  );
}