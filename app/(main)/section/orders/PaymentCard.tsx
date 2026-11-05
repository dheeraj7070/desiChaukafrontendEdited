import { formatDateTime, paymentMethodLabel } from "@/lib/order-format"
import { isAbandoned, paymentStatusMeta } from "@/lib/order-status"
import type { Order } from "@/types/order"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { Panel } from "./Panel"

/** `now` server se aata hai (hydration mismatch se bachne ke liye) */
export function PaymentCard({ order, now }: { order: Order; now: number }) {
  const status = paymentStatusMeta(order)

  const showRefund =
    !isAbandoned(order) &&
    ((order.status === "cancelled" && order.paymentStatus === "paid") ||
      order.paymentStatus === "refunded" ||
      !!order.refundedAt)

  let expiry: string | null = null
  if (order.status === "pending_payment" && order.expiresAt) {
    expiry =
      new Date(order.expiresAt).getTime() < now
        ? "Payment ki time-limit khatam ho chuki hai."
        : `Ye order ${formatDateTime(order.expiresAt)} tak valid hai.`
  }

  return (
    <Panel title="Payment">
      <dl className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Method</dt>
          <dd className="font-medium">{paymentMethodLabel(order.paymentMethod)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Status</dt>
          <dd>
            <OrderStatusBadge label={status.label} tone={status.tone} />
          </dd>
        </div>
      </dl>

      {expiry && <p className="mt-3 text-xs text-muted-foreground">{expiry}</p>}

      {showRefund && (
        <div className="mt-4 rounded-lg bg-muted/60 p-3 text-sm">
          <p className="font-medium">
            {order.refundedAt
              ? `Refund ${formatDateTime(order.refundedAt)} ko process ho gaya`
              : "Refund process mein hai"}
          </p>
          {order.refundRefrence && (
            <p className="mt-1 text-xs break-all text-muted-foreground">
              Reference: {order.refundRefrence}
            </p>
          )}
        </div>
      )}
    </Panel>
  )
}
