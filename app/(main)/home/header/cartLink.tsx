"use client";

import { useCart } from "@/components/cart/CartProvider";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const linkClass =
  "relative inline-flex size-10 items-center justify-center rounded-md hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export function CartLink() {
  const { lines } = useCart();
  const count = lines.reduce((total, line) => total + line.quantity, 0);
  return (
    <Link
      href="/cart"
      prefetch={false}
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
      className={linkClass}
    >
      <ShoppingCart className="size-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] leading-none font-semibold text-primary-foreground">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
