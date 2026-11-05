import { Suspense } from "react"
import type { Metadata } from "next"
import { buildQueryString, parseProductQuery } from "@/lib/product-query"
import { ProductResults } from "@/app/(main)/section/search/ProductResults"
import { ProductResultsSkeleton } from "@/app/(main)/section/search/ProductResultsSkeleton"

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { search } = parseProductQuery(await searchParams)
  return { title: search ? `${search} - Search | Desi Chauka` : "All products | Desi Chauka" }
}

export default async function ProductsPage({ searchParams }: Props) {
  const query = parseProductQuery(await searchParams)
  // key badalte hi Suspense fallback (skeleton) dikhta hai; header page ke upar jaisa hai waisa rehta hai
  const key = buildQueryString(query)

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <Suspense key={key} fallback={<ProductResultsSkeleton />}>
        <ProductResults query={query} />
      </Suspense>
    </main>
  )
}
