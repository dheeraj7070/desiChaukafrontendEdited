import { ProductResultsSkeleton } from "@/app/(main)/section/search/ProductResultsSkeleton"

// Home ke app/loading.tsx ko override karta hai, taaki /products par jaate waqt
// home ka skeleton na flash ho.
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <ProductResultsSkeleton />
    </main>
  )
}
