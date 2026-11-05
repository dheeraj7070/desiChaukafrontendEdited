"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCartLines } from "@/app/api/cart/read-actions";
import type { CartLine } from "@/types/cartLine";

type OptimisticAction =
  | { type: "add"; line: CartLine }
  | { type: "set"; id: string; quantity: number }
  | { type: "remove"; id: string };

type CartContextValue = {
  lines: CartLine[];
  loaded: boolean;
  applyOptimistic: (action: OptimisticAction) => void;
  refresh: () => Promise<void>;
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

// Keep the loaded cart across client route changes and provider remounts.
let cachedLines: CartLine[] | null = null;
let loadingLines: Promise<CartLine[]> | null = null;

function loadCartLinesOnce(): Promise<CartLine[]> {
  if (cachedLines !== null) return Promise.resolve(cachedLines);
  if (!loadingLines) {
    loadingLines = getCartLines()
      .then((lines) => {
        cachedLines = lines;
        return lines;
      })
      .finally(() => {
        loadingLines = null;
      });
  }
  return loadingLines;
}

/**
 * Cart is fetched once in the browser session and retained during navigation.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(cachedLines ?? []);
  const [loaded, setLoaded] = useState(cachedLines !== null);

  useEffect(() => {
    let active = true;
    void loadCartLinesOnce()
      .then((loaded) => {
        if (active) {
          setLines(loaded);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const applyOptimistic = useCallback((action: OptimisticAction) => {
    setLines((current) => reducer(current, action));
  }, []);

  const refresh = useCallback(async () => {
    const updated = await getCartLines();
    cachedLines = updated;
    setLines(updated);
    setLoaded(true);
  }, []);

  const value = useMemo(
    () => ({ lines, loaded, applyOptimistic, refresh }),
    [lines, loaded, applyOptimistic, refresh],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
