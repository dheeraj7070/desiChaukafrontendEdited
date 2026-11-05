import { boolean } from "zod";

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  productSlug: string;
  sku: string;
  options: Record<string, string>;
  thumbnail: string;
  quantity: number;
  priceMinor: number;
  compareAtPriceMinor: number | null;
  lineTotalMinor: number;
  availableForPurchase: boolean;
}

export interface Cart {
  cartId: string;
  items: CartItem[];
  itemCount: number;
  subtotalMinor: number;
}

export interface CartApiResponse {
  success: boolean;
  message: string;
  data: Cart;
  status: number;
}

export interface AddToCartApiResponse {
  success: boolean;
  message: string;
  data: {
    cartId: string;
  };
  status: number;
}
