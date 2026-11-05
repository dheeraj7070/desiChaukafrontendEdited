import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Panel({
  title,
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn("rounded-xl border bg-card p-4 md:p-5", className)}>
      {title && <h2 className="mb-3 text-base font-semibold">{title}</h2>}
      {children}
    </section>
  )
}
