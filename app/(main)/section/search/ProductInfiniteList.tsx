"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { loadProductsAction } from "@/app/api/products/actions"
// NOTE: apne ProductCard ka sahi path yahan daalo
import { ProductCard } from "@/app/(main)/section/home/Card"
import { Button } from "@/components/ui/button"
import type Product from "@/types/product"
import type {
  ProductListPagination,
  ProductListQuery,
} from "@/types/product-list"

type Props = {
  initialProducts: Product[]
  initialPagination: ProductListPagination
  /** page/limit ke bina */
  query: ProductListQuery
}

/**
 * Infinite scroll. Page ka `key` query ke saath badalta hai (Suspense key),
 * isliye nayi search par ye state apne aap reset ho jaati hai.
 */
export function ProductInfiniteList({
  initialProducts,
  initialPagination,
  query,
}: Props) {
  const [products, setProducts] = useState(initialProducts)
  const [pagination, setPagination] = useState(initialPagination)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const inFlight = useRef(false)
  const sentinel = useRef<HTMLDivElement>(null)
  const nextPage = pagination.hasMore ? pagination.nextPage : null

  const loadMore = useCallback(async () => {
    if (inFlight.current || nextPage == null) return
    inFlight.current = true
    setLoading(true)
    setError(null)

    const res = await loadProductsAction({ ...query, page: nextPage })

    if (res.ok) {
      setProducts((prev) => {
        const seen = new Set(prev.map((p) => p.id))
        return [...prev, ...res.data.products.filter((p) => !seen.has(p.id))]
      })
      setPagination(res.data.pagination)
    } else {
      setError(res.message)
    }

    inFlight.current = false
    setLoading(false)
  }, [nextPage, query])

  useEffect(() => {
    const el = sentinel.current
    if (!el || nextPage == null || error) return

    // Screen se 600px pehle hi agla page le aate hain, taaki user ko wait na dikhe.
    // Effect har naye page ke baad dobara chalta hai, isliye bada screen bhi bhar jaata hai.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void loadMore()
      },
      { rootMargin: "600px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [loadMore, nextPage, error])

  return (
    <div className="space-y-6">
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <div ref={sentinel} aria-hidden className="h-px" />

      <div className="flex min-h-10 items-center justify-center text-sm text-muted-foreground" aria-live="polite">
        {loading && (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" /> Aur products la rahe hain...
          </span>
        )}
        {error && (
          <div className="flex flex-col items-center gap-2">
            <p>{error}</p>
            <Button variant="outline" size="sm" onClick={() => void loadMore()}>
              Dobara try karo
            </Button>
          </div>
        )}
        {!loading && !error && nextPage == null && products.length > 0 && (
          <span>Sab products dikh gaye</span>
        )}
      </div>
    </div>
  )
}
