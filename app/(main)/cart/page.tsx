import type { Metadata } from "next";
import { getCart } from "@/lib/cart";
import { Card } from "@/components/ui/card";
import { CartItemRow } from "./component/cart-item-row";
import { OrderSummary } from "./component/order-summary";
import { EmptyCart } from "./component/empty-cart";

export const metadata: Metadata = { title: "Your cart" };

export default async function CartPage() {
  const cart = await getCart();

//   console.log(cart);

  if (!cart?.ok) {
    return (
      <div className="container mx-auto px-4">
        <p>{cart?.message}</p>
      </div>
    );
  }

    if (cart?.data.itemCount === 0) {
    return (
      <div className="container mx-auto px-4">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Your cart
        </h1>
        <p className="mt-1 text-muted-foreground">
          {cart.data.itemCount} {cart.data.itemCount === 1 ? "item" : "items"}
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
        <Card className="overflow-hidden p-0">
          <ul className="divide-y">
            {cart.data.items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </ul>
        </Card>

        <OrderSummary cart={cart.data} />
      </div>
    </div>
  );
}
