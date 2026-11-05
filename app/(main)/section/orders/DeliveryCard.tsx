import { ExternalLink } from "lucide-react"
import { formatDate, formatDateTime, safeHttpUrl } from "@/lib/order-format"
import type { Order } from "@/types/order"
import { Panel } from "./Panel"

/** Shipping/tracking/return ki koi bhi detail ho tabhi dikhta hai */
export function DeliveryCard({ order }: { order: Order }) {
  const trackingUrl = safeHttpUrl(order.trackingUrl)
  const rows: [string, React.ReactNode][] = []

  if (order.shippingProvider) rows.push(["Courier", order.shippingProvider])
  if (order.trackingNumber) rows.push(["Tracking number", order.trackingNumber])
  if (order.shippedAt) rows.push(["Shipped on", formatDateTime(order.shippedAt)])
  if (order.deliveredAt) rows.push(["Delivered on", formatDateTime(order.deliveredAt)])
  if (order.returnWindowEndsAt) {
    rows.push(["Return window ends", formatDate(order.returnWindowEndsAt)])
  }

  if (rows.length === 0 && !trackingUrl) return null

  return (
    <Panel title="Delivery">
      <dl className="space-y-2 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right font-medium break-all">{value}</dd>
          </div>
        ))}
      </dl>
      {trackingUrl && (
        <a
          href={trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Track package <ExternalLink className="size-4" aria-hidden />
        </a>
      )}
    </Panel>
  )
}
