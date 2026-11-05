"use server";

import { getCartSnapshot } from "@/lib/api/cart";
import type { CartLine } from "@/types/cartLine";

/** Load the signed-in cart from the browser provider, not on every route render. */
export async function getCartLines(): Promise<CartLine[]> {
  const cart = await getCartSnapshot();
  return (cart?.items ?? []).map(({ id, productId, variantId, quantity }) => ({
    id,
    productId,
    variantId,
    quantity,
  }));
}
