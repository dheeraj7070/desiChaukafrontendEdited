"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useTransition, useOptimistic } from "react";
import { Minus, Plus, Trash2, ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import type { CartItem } from "@/types/cart";
import {
  updateQuantity as updateQuantityAction,
  removeItemFromCart,
} from "@/app/api/cart/cart2";
export function CartItemRow({ item }: { item: CartItem }) {
  const [pending, startTransition] = useTransition();
  const [optimisticQty, setOptimisticQty] = useOptimistic(item.quantity);
 
  const hasDiscount =
    item.compareAtPriceMinor !== null &&
    item.compareAtPriceMinor > item.priceMinor;
  const discountPercent = hasDiscount
    ? Math.round(
        ((item.compareAtPriceMinor! - item.priceMinor) /
          item.compareAtPriceMinor!) *
          100,
      )
    : 0;

  // TODO: apni server actions / API se connect karo, phir router.refresh() ya revalidatePath
  function updateQuantity(next: number) {
    startTransition(async () => {
      setOptimisticQty(next); // UI turant update
      const res = await updateQuantityAction({
        id: item.id,
        quantity: next,
      });
      if (!res.ok) toast.error(res.error); // optimistic value auto-revert hogi
    });
  }
  function remove() {
    startTransition(async () => {
      const res = await removeItemFromCart(item.id);
      if (!res.ok) toast.error(res.error);
    });
  }

  return (
    <li
      key={item.id}
      className={`flex gap-4 p-4 sm:gap-6 sm:p-6 ${pending ? "opacity-60" : ""}`}
      aria-busy={pending}
    >
      <Link
        href={`/products/${item.productId}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-lg border bg-muted sm:size-32"
      >
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.productName}
            fill
            sizes="128px"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <ImageOff className="size-6 text-muted-foreground" />
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${item.productId}`}
              className="line-clamp-2 font-medium leading-snug hover:text-primary"
            >
              {item.productName}
            </Link>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {Object.values(item?.options ?? {}).map((value) => (
                <Badge key={value} variant="secondary" className="font-normal">
                  {value}
                </Badge>
              ))}
              {!item.availableForPurchase && (
                <Badge variant="destructive">Unavailable</Badge>
              )}
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="font-semibold">{formatMoney(item.lineTotalMinor)}</p>
            {optimisticQty > 1 && (
              <p className="text-xs text-muted-foreground">
                {formatMoney(item.priceMinor)} each
              </p>
            )}
          </div>
        </div>

        {hasDiscount && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground line-through">
              {formatMoney(item.compareAtPriceMinor!)}
            </span>
            <Badge>{discountPercent}% off</Badge>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div className="inline-flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-r-none"
              aria-label="Decrease quantity"
              disabled={pending || item.quantity <= 1}
              onClick={() => updateQuantity(optimisticQty - 1)}
            >
              <Minus className="size-4" />
            </Button>
            <span
              className="w-10 text-center text-sm font-medium tabular-nums"
              aria-live="polite"
            >
              {optimisticQty}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-l-none"
              aria-label="Increase quantity"
              disabled={pending || !item.availableForPurchase}
              onClick={() => updateQuantity(optimisticQty + 1)}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            disabled={pending}
            onClick={remove}
          >
            <Trash2 className="size-4" />
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
