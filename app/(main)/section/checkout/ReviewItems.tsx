import Image from "next/image"
import Link from "next/link"
import { ImageOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/lib/format"
import { itemIssue } from "@/lib/checkout-utils"
import type { CheckoutItem } from "@/types/checkout"

export function ReviewItems({ items, currency }: { items: CheckoutItem[]; currency: string }) {
  return (
    <ul className="divide-y">
      {items.map((item) => {
        const issue = itemIssue(item)
        const options = Object.values(item.options ?? {})
        return (
          <li key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <Link
              href={`/products/${item.productId}`}
              className="relative size-16 shrink-0 overflow-hidden rounded-lg border bg-muted sm:size-20"
            >
              {item.thumbnail ? (
                <Image src={item.thumbnail} alt={item.productName} fill sizes="80px" className="object-cover" />
              ) : (
                <span className="flex size-full items-center justify-center">
                  <ImageOff className="size-5 text-muted-foreground" />
                </span>
              )}
            </Link>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 sm:flex-row sm:items-start sm:gap-4">
              <div className="min-w-0">
                <Link
                  href={`/products/${item.productId}`}
                  className="line-clamp-2 text-sm font-medium hover:text-primary"
                >
                  {item.productName}
                </Link>
                {options.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {options.map((o) => (
                      <Badge key={o} variant="secondary" className="font-normal">
                        {o}
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatMoney(item.priceMinor, currency)} × {item.quantity}
                </p>
                {issue && (
                  <p role="alert" className="mt-1 text-xs font-medium text-destructive">
                    {issue}
                  </p>
                )}
              </div>
              <p className="shrink-0 text-sm font-semibold">
                {formatMoney(item.lineTotalMinor, currency)}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
