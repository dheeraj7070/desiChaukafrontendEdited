import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import { formatMoney } from "@/lib/format";
import { formatOptions } from "@/lib/order-format";
import type { Order } from "@/types/order";

export function OrderItems({ order }: { order: Order }) {
  return (
    <ul className="divide-y">
      {order.items.map((item) => {
        const options = formatOptions(item.options);
        return (
          <li key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border bg-muted">
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <span className="flex size-full items-center justify-center">
                  <ImageOff className="size-5 text-muted-foreground" />
                </span>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 sm:flex-row sm:items-start sm:gap-4">
              <div className="min-w-0">
                <Link
                  href={`/products/${item.productId}`}
                  className="line-clamp-2 text-sm font-medium hover:underline"
                >
                  {item.name}
                </Link>
                {options && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {options}
                  </p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatMoney(item.unitPriceMinor, order.currency)} ×{" "}
                  {item.quantity}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold">
                {formatMoney(item.lineTotalMinor, order.currency)}
              </p>
              <Link
                href={`/review/${item.productId}`}
                className="line-clamp-2 text-sm font-medium hover:underline"
              >
                Write Review
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
