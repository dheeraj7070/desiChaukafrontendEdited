import type Product from "@/types/product"

export const PRODUCT_SORTS = [
  "latest",
  "oldest",
  "price_asc",
  "price_desc",
  "name_asc",
  "name_desc",
] as const

export type ProductSort = (typeof PRODUCT_SORTS)[number]

/**
 * GET /getProducts ke query options.
 * Storefront ke liye `status` jaanbujhkar nahi rakha - client kabhi status nahi bhejta.
 * Price paise mein hota hai (₹399 = 39900).
 */
export type ProductListQuery = {
  search?: string
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  sort?: ProductSort
  /** 1-50, default 20 */
  limit?: number
  /** 1+, default 1 */
  page?: number
}

export type ProductListPagination = {
  page: number
  limit: number
  totalCount: number
  hasMore: boolean
  nextPage: number | null
}

export type ProductListData = {
  products: Product[]
  pagination: ProductListPagination
}
