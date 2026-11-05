import { loadProductsAction } from "@/app/api/products/actions"
import type { ProductListQuery } from "@/types/product-list"
import { EmptyState } from "./EmptyState"
import { ErrorState } from "./ErrorState"
import { ProductInfiniteList } from "./ProductInfiniteList"
import { SortSelect } from "./SortSelect"

export async function ProductResults({ query }: { query: ProductListQuery }) {
  const result = await loadProductsAction({ ...query, page: 1 })

  if (!result.ok) return <ErrorState message={result.message} />

  const { products, pagination } = result.data
  if (products.length === 0) return <EmptyState search={query.search} />

  const { totalCount } = pagination
  const noun = totalCount === 1 ? "result" : "results"

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold md:text-xl">
          {query.search ? (
            <>
              {totalCount} {noun} for{" "}
              <span className="text-primary">“{query.search}”</span>
            </>
          ) : (
            <>All products ({totalCount})</>
          )}
        </h1>
        <SortSelect value={query.sort ?? "latest"} />
      </div>

      <ProductInfiniteList
        initialProducts={products}
        initialPagination={pagination}
        query={query}
      />
    </section>
  )
}
