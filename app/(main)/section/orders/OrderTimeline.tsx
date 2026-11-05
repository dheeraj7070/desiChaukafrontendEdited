import { Check, X } from "lucide-react"
import { formatDateTime } from "@/lib/order-format"
import type { TimelineStep } from "@/lib/order-status"
import { cn } from "@/lib/utils"

const DOT: Record<TimelineStep["state"], string> = {
  done: "border-primary bg-primary text-primary-foreground",
  current: "border-primary bg-background text-primary",
  upcoming: "border-border bg-background text-muted-foreground",
  failed: "border-destructive bg-destructive text-white",
}

export function OrderTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol aria-label="Order progress">
      {steps.map((step, i) => {
        const last = i === steps.length - 1
        return (
          <li key={step.key} className={cn("relative flex gap-3", !last && "pb-6")}>
            {!last && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-6 bottom-0 left-[11px] w-px",
                  step.state === "done" ? "bg-primary" : "bg-border",
                )}
              />
            )}
            <span
              className={cn(
                "relative z-10 grid size-6 shrink-0 place-items-center rounded-full border-2",
                DOT[step.state],
              )}
            >
              {step.state === "done" && <Check className="size-3.5" aria-hidden />}
              {step.state === "failed" && <X className="size-3.5" aria-hidden />}
              {step.state === "current" && <span className="size-2 rounded-full bg-primary" />}
            </span>
            <div className="min-w-0 pt-0.5">
              <p
                className={cn(
                  "text-sm font-semibold",
                  step.state === "upcoming" && "text-muted-foreground",
                  step.state === "failed" && "text-destructive",
                )}
              >
                {step.label}
              </p>
              {step.date && (
                <p className="text-xs text-muted-foreground">{formatDateTime(step.date)}</p>
              )}
              {step.note && <p className="mt-1 text-xs text-muted-foreground">{step.note}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
