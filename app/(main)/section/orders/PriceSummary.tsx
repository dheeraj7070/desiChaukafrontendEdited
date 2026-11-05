import { formatMoney } from "@/lib/format"
import type { Order } from "@/types/order"
import { Panel } from "./Panel"

export function PriceSummary({ order }: { order: Order }) {
  const itemCount = order.items.reduce((n, i) => n + i.quantity, 0)
  return (
    <Panel title="Order summary">
      <dl className="space-y-2 text-sm">
        <Row label={`Subtotal (${itemCount} ${itemCount === 1 ? "item" : "items"})`}>
          {formatMoney(order.subtotalMinor, order.currency)}
        </Row>
        <Row label="Shipping">
          {order.shippingMinor === 0 ? (
            <span className="font-medium text-emerald-700 dark:text-emerald-400">Free</span>
          ) : (
            formatMoney(order.shippingMinor, order.currency)
          )}
        </Row>
        <div className="my-3 border-t" />
        <Row label={<span className="font-semibold">Total</span>}>
          <span className="text-base font-bold">{formatMoney(order.totalMinor, order.currency)}</span>
        </Row>
      </dl>
    </Panel>
  )
}

function Row({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}
