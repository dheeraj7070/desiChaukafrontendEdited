import Link from "next/link";
import { Package } from "lucide-react";
import { ProfileLink } from "./profileLink";
import { cn } from "@/lib/utils";

import { CartLink } from "./cartLink";

// Phone/tablet: gol icon-only button (40px). lg+: label ke saath pill.
const base =
  "relative flex h-10 w-10 items-center justify-center gap-2 rounded-full border px-0 text-sm font-medium transition-[background-color,transform] active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:h-11 lg:w-auto lg:px-4";

export default async function NavActions() {
  return (
    <nav
      aria-label="Account actions"
      // ml-auto: phone pe Brand se door, right edge tak dhakel deta hai
      className="ml-auto flex items-center gap-2 lg:gap-3"
    >
      <ProfileLink />
      <CartLink />

      <Link
        href="/orders"
        aria-label="Orders"
        className={cn(
          base,
          "border-accent bg-accent text-accent-foreground hover:bg-accent/90",
        )}
      >
        <Package className="size-5" />
        <span className="hidden font-bold lg:inline">Order</span>
        {/* <Count value={cartCount} /> */}
      </Link>
    </nav>
  );
}
