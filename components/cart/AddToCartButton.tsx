"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getCardAction } from "@/lib/product-utility";
import { useCartActions } from "@/components/cart/useCartActions";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { QuickAddDialog } from "./quckAddDialog";
import type Product from "@/types/product";

const btn = "h-11 w-full bg-accent text-accent-foreground hover:bg-accent/90";

export function AddToCartButton({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const { lines, pending, add, changeQuantity } = useCartActions();
  const action = getCardAction(product);

  const productLines = lines.filter((l) => l.productId === product.id);

  /* ---- Multiple variants: user ko variant chunna padega ---- */
  if (action.type === "choose") {
    const inCart = productLines.reduce((n, l) => n + l.quantity, 0);
    return (
      <>
        <Button className={btn} onClick={() => setOpen(true)}>
          Select Options{inCart > 0 ? ` (${inCart})` : ""}
        </Button>
        {/* Dialog tabhi mount ho jab khule, taaki har baar fresh state mile */}
        {open && (
          <QuickAddDialog
            product={product}
            open={open}
            onOpenChange={setOpen}
          />
        )}
      </>
    );
  }

  /* ---- Single variant ya no-variant: seedha add, ya stepper ---- */
  // TODO: "unavailable" branch abhi purane code jaisa hi hai (productId se add karta hai).
  // Agar iska matlab sach mein out-of-stock hai, to yahan disabled button dikhao.
  const target =
    action.type === "unavailable"
      ? { productId: product.id }
      : { productId: action.productId, variantId: action.variantId };

  const line = productLines.find((l) =>
    target.variantId ? l.variantId === target.variantId : true,
  );

  if (line) {
    return (
      <QuantityStepper
        className="h-11 w-full rounded-md"
        quantity={line.quantity}
        pending={pending}
        onChange={(next) => changeQuantity(line, next)}
      />
    );
  }

  return (
    <Button className={btn} disabled={pending} onClick={() => add(target)}>
      {pending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
