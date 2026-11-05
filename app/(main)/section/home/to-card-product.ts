import type Product from "@/types/product"
import type { HomeProduct } from "@/types/home"

/**
 * /home ka product, list API ke Product ka subset hai (description/variants nahi).
 * ProductCard ko Product chahiye, isliye yahin ek jagah adapt kar rahe hain.
 * Agar tumhare Product type mein koi required field alag hai to yahan map kar do.
 */
export function toCardProduct(p: HomeProduct): Product {
  return p as unknown as Product
}
