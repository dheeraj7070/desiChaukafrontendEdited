import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ImageOff } from "lucide-react"
import { Card } from "@/components/ui/card"
import { formatMoney } from "@/lib/format"
import { formatDate } from "@/lib/order-format"
import { getDisplayStatus, isAbandoned } from "@/lib/order-status"
import { cn } from "@/lib/utils"
import type { Order } from "@/types/order"
import { OrderStatusBadge } from "./OrderStatusBadge"

const MAX_THUMBS = 4

export function OrderCard({ order }: { order: Order }) {
  const status = getDisplayStatus(order)
  const abandoned = isAbandoned(order)
  const thumbs = order.items.slice(0, MAX_THUMBS)
  const extra = order.items.length - thumbs.length

  const names = order.items.slice(0, 2).map((i) => i.name)
  const more = order.items.length - names.length
  const summary = names.join(", ") + (more > 0 ? ` +${more} more` : "")

  return (
    <Card
      className={cn(
        "group relative gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md",
        abandoned && "opacity-75",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 border-b bg-muted/40 px-4 py-3">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <Meta label="Order placed" value={formatDate(order.createdAt)} />
          <Meta label="Total" value={formatMoney(order.totalMinor, order.currency)} />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Order #</p>
            {/* Stretched link: poora card clickable */}
            <Link
              href={`/orders/${order.orderNumber}`}
              className="block max-w-56 truncate text-sm font-medium after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring sm:max-w-xs"
            >
              {order.orderNumber}
            </Link>
          </div>
        </div>
        <OrderStatusBadge label={status.label} tone={status.tone} />
      </div>

      <div className="flex items-center gap-4 px-4 py-4">
        <ul className="flex shrink-0 -space-x-2">
          {thumbs.map((item) => (
            <li
              key={item.id}
              className="relative size-14 overflow-hidden rounded-lg border-2 border-card bg-muted"
            >
              {item.thumbnail ? (
                <Image src={item.thumbnail} alt="" fill sizes="56px" className="object-cover" />
              ) : (
                <span className="flex size-full items-center justify-center">
                  <ImageOff className="size-4 text-muted-foreground" />
                </span>
              )}
            </li>
          ))}
          {extra > 0 && (
            <li className="relative grid size-14 place-items-center rounded-lg border-2 border-card bg-muted text-xs font-semibold">
              +{extra}
            </li>
          )}
        </ul>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-medium">{summary}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {order.items.length} {order.items.length === 1 ? "product" : "products"}
          </p>
        </div>

        <ChevronRight
          className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
    </Card>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}
