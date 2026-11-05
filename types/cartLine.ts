import type { CartItem } from "@/types/cart";

// Browser ko poora CartItem (thumbnail, name, price...) bhejne ki zarurat nahi.
// Sirf itna chahiye ki "ye product/variant cart mein hai ya nahi, aur kitna".
export type CartLine = Pick<CartItem, "id" | "productId" | "variantId" | "quantity">;
