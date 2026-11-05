"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/app/api/cart/cart2";
import { formatMoney } from "@/lib/format";
import { VariantPicker } from "./variant-picker";
import type Product from "@/types/product";
import type { Variant } from "@/types/product";

type Props = {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const isBuyable = (v: Variant) => v.status === "active" && (v.stock ?? 1) > 0;

export function QuickAddDialog({ product, open, onOpenChange }: Props) {
  const variants = (product.variants ?? []).filter(
    (v) => v.status === "active",
  );

  // Shuru mein pehla buyable variant select hoga
  const [selectedId, setSelectedId] = useState(
    () => (variants.find(isBuyable) ?? variants[0])?.id ?? "",
  );
  const [pending, startTransition] = useTransition();

  const selected = variants.find((v) => v.id === selectedId);
  const canAdd = !!selected && isBuyable(selected);

  function handleAdd() {
    if (!selected) return;
    startTransition(async () => {
      const res = await addToCart({
        productId: selected.productId,
        variantId: selected.id,
        quantity: 1,
      });
      if(!res) {
        toast.error('something went wrong');
        return;
    }
      if (res.ok) {
        toast.success("Cart mein add ho gaya");
        onOpenChange(false);
      } else {
        toast.error(res.error);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription className="line-clamp-2">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        <VariantPicker
          variants={variants}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        {selected && (
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-xl font-bold">
              {formatMoney(selected.priceMinor, product.currency)}
            </span>
            {selected.compareAtPriceMinor != null &&
              selected.compareAtPriceMinor > selected.priceMinor && (
                <del className="text-sm text-muted-foreground">
                  {formatMoney(selected.compareAtPriceMinor, product.currency)}
                </del>
              )}
          </div>
        )}

        <Button
          className="mt-2 h-11 w-full"
          disabled={!canAdd || pending}
          onClick={handleAdd}
        >
          {pending ? "Adding..." : canAdd ? "Add to Cart" : "Out of Stock"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
