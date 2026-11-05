import type { Order } from "@/types/order"

export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger"

export const TONE_CLASSES: Record<StatusTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-primary/10 text-primary",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300",
  danger: "bg-destructive/10 text-destructive",
}

const STATUS_META: Record<string, { label: string; tone: StatusTone }> = {
  pending_payment: { label: "Payment pending", tone: "warning" },
  confirmed: { label: "Confirmed", tone: "info" },
  processing: { label: "Processing", tone: "info" },
  shipped: { label: "Shipped", tone: "info" },
  out_for_delivery: { label: "Out for delivery", tone: "info" },
  delivered: { label: "Delivered", tone: "success" },
  cancelled: { label: "Cancelled", tone: "danger" },
  refunded: { label: "Refunded", tone: "neutral" },
}

function humanize(s: string) {
  const t = s.replace(/[_-]+/g, " ").trim()
  return t.charAt(0).toUpperCase() + t.slice(1)
}

/** Adhoora checkout: order cancel ho gaya aur payment kabhi hui hi nahi */
export function isAbandoned(order: Pick<Order, "status" | "paymentStatus">): boolean {
  return order.status === "cancelled" && order.paymentStatus === "pending"
}

export function getDisplayStatus(
  order: Pick<Order, "status" | "paymentStatus">,
): { label: string; tone: StatusTone } {
  if (isAbandoned(order)) return { label: "Payment not completed", tone: "neutral" }
  return STATUS_META[order.status] ?? { label: humanize(order.status), tone: "neutral" }
}

export function paymentStatusMeta(order: Pick<Order, "paymentMethod" | "paymentStatus">): {
  label: string
  tone: StatusTone
} {
  if (order.paymentMethod === "cod" && order.paymentStatus === "pending") {
    return { label: "Pay on delivery", tone: "info" }
  }
  switch (order.paymentStatus) {
    case "paid":
      return { label: "Paid", tone: "success" }
    case "pending":
      return { label: "Pending", tone: "warning" }
    case "failed":
      return { label: "Failed", tone: "danger" }
    case "refunded":
      return { label: "Refunded", tone: "neutral" }
    default:
      return { label: humanize(order.paymentStatus), tone: "neutral" }
  }
}

export type TimelineState = "done" | "current" | "upcoming" | "failed"

export type TimelineStep = {
  key: string
  label: string
  date: string | null
  state: TimelineState
  note?: string
}

const IN_TRANSIT = new Set(["shipped", "out_for_delivery"])
const CONFIRMED = new Set(["confirmed", "processing"])

export function getTimeline(order: Order): TimelineStep[] {
  const placed: TimelineStep = {
    key: "placed",
    label: "Order placed",
    date: order.createdAt,
    state: "done",
  }

  if (isAbandoned(order)) {
    return [
      placed,
      {
        key: "payment",
        label: "Payment not completed",
        date: order.updatedAt,
        state: "failed",
        note: "Payment poori nahi hui, isliye ye order cancel ho gaya.",
      },
    ]
  }

  if (order.status === "cancelled") {
    const steps: TimelineStep[] = [
      placed,
      { key: "cancelled", label: "Order cancelled", date: order.updatedAt, state: "failed" },
    ]
    if (order.paymentStatus === "paid" || order.paymentStatus === "refunded") {
      steps.push(
        order.refundedAt || order.paymentStatus === "refunded"
          ? { key: "refund", label: "Refund processed", date: order.refundedAt, state: "done" }
          : { key: "refund", label: "Refund in progress", date: null, state: "current" },
      )
    }
    return steps
  }

  const level =
    order.deliveredAt || order.status === "delivered"
      ? 3
      : order.shippedAt || IN_TRANSIT.has(order.status)
        ? 2
        : CONFIRMED.has(order.status)
          ? 1
          : 0

  const steps: TimelineStep[] = [
    placed,
    { key: "confirmed", label: "Confirmed", date: null, state: level >= 1 ? "done" : "upcoming" },
    { key: "shipped", label: "Shipped", date: order.shippedAt, state: level >= 2 ? "done" : "upcoming" },
    { key: "delivered", label: "Delivered", date: order.deliveredAt, state: level >= 3 ? "done" : "upcoming" },
  ]

  if (order.status === "pending_payment") {
    steps.splice(1, 0, {
      key: "payment",
      label: "Waiting for payment",
      date: null,
      state: "current",
    })
  }

  return steps
}
