"use server"

import { fetchProducts } from "@/lib/api/products"
import type { ApiResult } from "@/lib/envelope"
import type { ProductListData, ProductListQuery } from "@/types/product-list"

/** Pehla page (server) aur infinite scroll ke agle pages (client) dono yahin se */
export async function loadProductsAction(
  query: ProductListQuery,
): Promise<ApiResult<ProductListData>> {
  return fetchProducts(query)
}
