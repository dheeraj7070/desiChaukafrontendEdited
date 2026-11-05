import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatMoney } from "@/lib/format";
import type { Cart } from "@/types/cart";

export function OrderSummary({ cart }: { cart: Cart }) {
  const savingsMinor = cart.items.reduce((sum, item) => {
    if (
      item.compareAtPriceMinor &&
      item.compareAtPriceMinor > item.priceMinor
    ) {
      return sum + (item.compareAtPriceMinor - item.priceMinor) * item.quantity;
    }
    return sum;
  }, 0);

  const hasUnavailable = cart.items.some((i) => !i.availableForPurchase);

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
            )
          </span>
          <span className="font-medium">{formatMoney(cart.subtotalMinor)}</span>
        </div>

        {savingsMinor > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">You save</span>
            <span className="rounded bg-primary px-1.5 py-0.5 font-medium text-primary-foreground">
              {formatMoney(savingsMinor)}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-muted-foreground">Calculated at checkout</span>
        </div>

        <Separator />

        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>{formatMoney(cart.subtotalMinor)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3">
        {hasUnavailable && (
          <p className="w-full text-sm text-destructive">
            Kuch items available nahi hain. Unhe remove karke checkout kijiye.
          </p>
        )}
        <Button  asChild size="lg" className="w-full bg-accent">
          <Link
            href="/checkout"
            aria-disabled={hasUnavailable}
            className={hasUnavailable ? "pointer-events-none opacity-50" : ""}
          >
            Proceed to checkout
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
