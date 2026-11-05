"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { useCartActions } from "@/components/cart/useCartActions";
import { cn } from "@/lib/utils";

type Props = {
  productId: string;
  /** Cart mein variant jata hai. Bina variants wale products mein undefined. */
  variantId?: string;
  /** Ek baar mein kitne le sakte ho (stock aur 99 mein se kam) */
  maxQty?: number;
  disabled?: boolean;
  disabledLabel?: string;
};

export default function Purchase({
  productId,
  variantId,
  maxQty = 99,
  disabled = false,
  disabledLabel = "Unavailable",
}: Props) {
  const [qty, setQty] = useState(1);
  const { lines, loaded, pending, add, changeQuantity } = useCartActions();

  // Variant badalne par maxQty kam ho jaye to qty bhi neeche aa jaye
  const safeQty = Math.min(qty, maxQty);

  // Is product (aur selected variant) ki cart line, agar hai
  const line = lines.find(
    (l) =>
      l.productId === productId && (variantId ? l.variantId === variantId : true),
  );

  /* ---- Pehle se cart mein hai: stepper + View cart ---- */
  if (line) {
    return (
      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <QuantityStepper
            className="h-12 w-40 rounded-full"
            quantity={line.quantity}
            max={maxQty}
            pending={pending || !loaded}
            onChange={(next) => changeQuantity(line, next)}
          />
          <Link
            href="/cart"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 min-w-48 flex-1 gap-2 rounded-full bg-accent font-bold text-accent-foreground hover:bg-accent/90",
            )}
          >
            <ShoppingBag className="size-5" />
            View cart
          </Link>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {line.quantity} in your cart
        </p>
      </div>
    );
  }

  /* ---- Cart mein nahi hai: quantity chuno, phir add ---- */
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <div className="flex h-12 items-center rounded-full border">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={disabled || pending || !loaded || safeQty <= 1}
          onClick={() => setQty(safeQty - 1)}
          className="grid size-12 place-items-center rounded-full hover:bg-muted disabled:opacity-40"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-8 text-center font-bold" aria-live="polite">
          {safeQty}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={disabled || pending || !loaded || safeQty >= maxQty}
          onClick={() => setQty(safeQty + 1)}
          className="grid size-12 place-items-center rounded-full hover:bg-muted disabled:opacity-40"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <Button
        size="lg"
        disabled={disabled || pending || !loaded}
        onClick={() => add({ productId, variantId, quantity: safeQty })}
        className="h-12 min-w-48 flex-1 gap-2 rounded-full bg-accent font-bold text-accent-foreground hover:bg-accent/90"
      >
        <ShoppingBag className="size-5" />
        {!loaded
          ? "Loading cart..."
          : disabled
            ? disabledLabel
            : pending
              ? "Adding..."
              : "Add to Cart"}
      </Button>
    </div>
  );
}
