"use client";

import { createContext, useContext, useMemo, useOptimistic } from "react";
import type { CartLine } from "@/types/cartLine";

type OptimisticAction =
  | { type: "add"; line: CartLine }
  | { type: "set"; id: string; quantity: number }
  | { type: "remove"; id: string };

type CartContextValue = {
  lines: CartLine[];
  /** Sirf startTransition ke andar call karo */
  applyOptimistic: (action: OptimisticAction) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function reducer(lines: CartLine[], action: OptimisticAction): CartLine[] {
  switch (action.type) {
    case "add":
      return [...lines, action.line];
    case "set":
      return lines.map((l) =>
        l.id === action.id ? { ...l, quantity: action.quantity } : l,
      );
    case "remove":
      return lines.filter((l) => l.id !== action.id);
  }
}

/**
 * `lines` server se aati hain. Action ke baad revalidatePath("/", "layout")
 * layout dobara render karta hai, naye `lines` aate hain aur optimistic state
 * apne aap asli data se replace ho jaati hai.
 */
export function CartProvider({
  lines,
  children,
}: {
  lines: CartLine[];
  children: React.ReactNode;
}) {
  const [optimisticLines, applyOptimistic] = useOptimistic(lines, reducer);

  const value = useMemo(
    () => ({ lines: optimisticLines, applyOptimistic }),
    [optimisticLines, applyOptimistic],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
