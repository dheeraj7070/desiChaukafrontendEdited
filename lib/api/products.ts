import "server-only"
import { publicRequestEnvelope, type ApiResult } from "@/lib/envelope"
import { buildQueryString, DEFAULT_LIMIT } from "@/lib/product-query"
import type { ProductListData, ProductListQuery } from "@/types/product-list"

/** GET /getProducts (public). Status filter jaanbujhkar nahi bheja jaata. */
export function fetchProducts(
  query: ProductListQuery,
): Promise<ApiResult<ProductListData>> {
  const qs = buildQueryString({ limit: DEFAULT_LIMIT, page: 1, ...query })
  return publicRequestEnvelope<ProductListData>(
    `/getProducts${qs ? `?${qs}` : ""}`,
  )
}
