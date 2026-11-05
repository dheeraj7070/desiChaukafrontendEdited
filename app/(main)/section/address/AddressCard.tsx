import type { ReactNode } from "react"
import { Briefcase, Home, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Address } from "@/types/address"

const TYPE_META: Record<string, { label: string; Icon: typeof Home }> = {
  home: { label: "Home", Icon: Home },
  work: { label: "Work", Icon: Briefcase },
  other: { label: "Other", Icon: MapPin },
}

type Props = {
  address: Address
  /** Neeche ke buttons (profile mein edit/delete, checkout mein select waghera) */
  footer?: ReactNode
  className?: string
}

/** Sirf dikhane wala card - koi state nahi, isliye checkout par bhi seedha reuse hota hai */
export function AddressCard({ address, footer, className }: Props) {
  const meta = TYPE_META[address.addressType] ?? TYPE_META.other
  const cityLine = [address.city, address.state].filter(Boolean).join(", ")

  return (
    <article
      className={cn(
        "rounded-xl border bg-card p-4 md:p-5",
        address.isDefault && "border-primary/50 ring-1 ring-primary/20",
        className,
      )}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">
          <meta.Icon className="size-3.5" aria-hidden /> {meta.label}
        </span>
        {address.isDefault && (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            Default
          </span>
        )}
      </div>

      <address className="space-y-0.5 text-sm not-italic">
        <p className="font-semibold">{address.fullName}</p>
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        {address.landmark && (
          <p className="text-muted-foreground">Landmark: {address.landmark}</p>
        )}
        <p>
          {cityLine} {address.postalCode}
        </p>
        <p>{address.country}</p>
        <p className="pt-1 text-muted-foreground">Phone: {address.phone}</p>
      </address>

      {footer && <div className="mt-4 border-t pt-3">{footer}</div>}
    </article>
  )
}
