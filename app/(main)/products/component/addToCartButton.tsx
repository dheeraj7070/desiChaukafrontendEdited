"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/app/api/cart/cart2";
import { getCardAction } from "@/lib/product-utility";
import { QuickAddDialog } from "./quckAddDialog";
import type Product from "@/types/product";

const btn = "h-11 w-full bg-accent text-accent-foreground hover:bg-accent/90";

export function AddToCartButton({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const action = getCardAction(product);

  if (action.type === "unavailable") {
    return (
      <Button
        className={btn}
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const res = await addToCart({
              productId: product.id,
              quantity: 1,
            });
            console.log(res);
            if (!res) {
              toast.error("something went wrong");
              return;
            }
            if (res.ok) toast.success("Cart mein add ho gaya");
            else toast.error(res.error);
          })
        }
      >
        {pending ? "Adding..." : "Add to Cart"}
      </Button>
    );
  }

  if (action.type === "choose") {
    return (
      <>
        <Button className={btn} onClick={() => setOpen(true)}>
          Select Options
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

  return (
    <Button
      className={btn}
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const res = await addToCart({
            productId: action.productId,
            variantId: action.variantId,
            quantity: 1,
          });
          console.log(res);
          if (!res) {
            toast.error("something went wrong");
            return;
          }
          if (res.ok) toast.success("Cart mein add ho gaya");
          else toast.error(res.error);
        })
      }
    >
      {pending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
