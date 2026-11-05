import "server-only";
import { cache } from "react";
import { requestEnvelope } from "@/lib/envelope";
import { Cart } from "@/types/cart";

export const getCartSnapshot = cache(async (): Promise<Cart | null> => {
  try {
    const res = await requestEnvelope<Cart>("/cart");
    return res.ok ? res.data : null;
  } catch {
    return null;
  }
});

