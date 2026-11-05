import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="size-9 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">Your cart is empty</h1>
      <p className="text-muted-foreground">
        Pickles, achaar aur pakwaan abhi cart mein nahi hain. Products dekhiye aur
        pasand aaye to add kijiye.
      </p>
      <Button asChild size="lg">
        <Link href="/products">Browse products</Link>
      </Button>
    </div>
  );
}
