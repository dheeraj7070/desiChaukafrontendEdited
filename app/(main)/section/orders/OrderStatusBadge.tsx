import { cn } from "@/lib/utils"
import { TONE_CLASSES, type StatusTone } from "@/lib/order-status"

export function OrderStatusBadge({
  label,
  tone,
  className,
}: {
  label: string
  tone: StatusTone
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {label}
    </span>
  )
}
