"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { loadOrdersAction } from "@/app/api/orders/actions"
import { Button } from "@/components/ui/button"
import type { Order, OrderPagination } from "@/types/order"
import { OrderCard } from "./OrderCard"

type Props = {
  initialOrders: Order[]
  initialPagination: OrderPagination
}

/** Infinite scroll - pehla page server se aata hai, agle pages sentinel dikhte hi */
export function OrderList({ initialOrders, initialPagination }: Props) {
  const [orders, setOrders] = useState(initialOrders)
  const [pagination, setPagination] = useState(initialPagination)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{ code: string; message: string } | null>(null)

  const inFlight = useRef(false)
  const sentinel = useRef<HTMLDivElement>(null)
  const nextPage = pagination.hasMore ? pagination.nextPage : null

  const loadMore = useCallback(async () => {
    if (inFlight.current || nextPage == null) return
    inFlight.current = true
    setLoading(true)
    setError(null)

    const res = await loadOrdersAction({ page: nextPage })

    if (res.ok) {
      setOrders((prev) => {
        const seen = new Set(prev.map((o) => o.id))
        return [...prev, ...res.data.orders.filter((o) => !seen.has(o.id))]
      })
      setPagination(res.data.pagination)
    } else {
      setError({ code: res.code, message: res.message })
    }

    inFlight.current = false
    setLoading(false)
  }, [nextPage])

  useEffect(() => {
    const el = sentinel.current
    if (!el || nextPage == null || error) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void loadMore()
      },
      { rootMargin: "500px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [loadMore, nextPage, error])

  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id}>
            <OrderCard order={order} />
          </li>
        ))}
      </ul>

      <div ref={sentinel} aria-hidden className="h-px" />

      <div
        className="flex min-h-10 items-center justify-center text-sm text-muted-foreground"
        aria-live="polite"
      >
        {loading && (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
          </span>
        )}
        {error && (
          <div className="flex flex-col items-center gap-2 text-center">
            <p>{error.message}</p>
            {error.code === "UNAUTHORIZED" ? (
              <Button asChild size="sm">
                <Link href="/login?next=/orders">Please login.</Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => void loadMore()}>
                Try again.
              </Button>
            )}
          </div>
        )}
        
      </div>
    </div>
  )
}
