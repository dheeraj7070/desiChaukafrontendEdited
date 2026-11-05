"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  addToCart,
  removeItemFromCart,
  updateQuantity,
  type ActionResult,
} from "@/app/api/cart/cart";
import { useCart } from "@/components/cart/CartProvider";
import type { CartLine } from "@/types/cartLine";

/**
 * Product card aur product details page dono ka common cart logic:
 * optimistic update + server action + toast + guest ko /login bhejna.
 */
export function useCartActions() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { lines, loaded, applyOptimistic, refresh } = useCart();

  async function handleResult(res: ActionResult, successMessage?: string) {
    if (res.ok) {
      if (successMessage) toast.success(successMessage);
      await refresh();
      return;
    }
    toast.error(res.error);
    if (res.code === "UNAUTHORIZED") router.push("/login");
    await refresh();
  }

  function add(input: {
    productId: string;
    variantId?: string;
    quantity?: number;
  }) {
    const quantity = input.quantity ?? 1;
    startTransition(async () => {
      applyOptimistic({
        type: "add",
        line: {
          id: `optimistic-${input.variantId ?? input.productId}`,
          productId: input.productId,
          variantId: input.variantId ?? "",
          quantity,
        },
      });
      await handleResult(
        await addToCart({
          productId: input.productId,
          variantId: input.variantId,
          quantity,
        }),
        "Cart mein add ho gaya",
      );
    });
  }

  function changeQuantity(line: CartLine, next: number) {
    startTransition(async () => {
      if (next < 1) {
        applyOptimistic({ type: "remove", id: line.id });
        await handleResult(await removeItemFromCart(line.id), "Cart se hata diya");
        return;
      }
      applyOptimistic({ type: "set", id: line.id, quantity: next });
      await handleResult(await updateQuantity({ id: line.id, quantity: next }));
    });
  }

  return { lines, loaded, pending, add, changeQuantity };
}
