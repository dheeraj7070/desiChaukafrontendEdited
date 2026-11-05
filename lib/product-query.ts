import {
  PRODUCT_SORTS,
  type ProductListQuery,
  type ProductSort,
} from "@/types/product-list"

export const DEFAULT_LIMIT = 20
const MAX_LIMIT = 50
const MAX_SEARCH_LENGTH = 100

type RawParams = Record<string, string | string[] | undefined>

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v
}

function toInt(v: unknown, min: number, max = Number.MAX_SAFE_INTEGER) {
  const n = typeof v === "string" ? Number(v) : v
  if (typeof n !== "number" || !Number.isFinite(n)) return undefined
  return Math.min(max, Math.max(min, Math.trunc(n)))
}

function toSort(v: unknown): ProductSort | undefined {
  return (PRODUCT_SORTS as readonly string[]).includes(v as string)
    ? (v as ProductSort)
    : undefined
}

function toText(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined
  const t = v.trim().slice(0, max)
  return t || undefined
}

/**
 * Kisi bhi (untrusted) input ko safe query mein badalta hai.
 * Server action client se aata data bhi isi se guzarta hai.
 * `status` yahan kabhi pass nahi hota.
 */
export function normalizeProductQuery(input: ProductListQuery): ProductListQuery {
  const out: ProductListQuery = {}
  const search = toText(input.search, MAX_SEARCH_LENGTH)
  const categoryId = toText(input.categoryId, 100)
  const sort = toSort(input.sort)
  const minPrice = toInt(input.minPrice, 0)
  const maxPrice = toInt(input.maxPrice, 0)
  const limit = toInt(input.limit, 1, MAX_LIMIT)
  const page = toInt(input.page, 1)

  if (search) out.search = search
  if (categoryId) out.categoryId = categoryId
  if (sort) out.sort = sort
  if (minPrice !== undefined) out.minPrice = minPrice
  if (maxPrice !== undefined) out.maxPrice = maxPrice
  if (limit !== undefined) out.limit = limit
  if (page !== undefined) out.page = page
  return out
}

/** URL ke searchParams se query (page/limit ke bina - wo infinite scroll sambhalta hai) */
export function parseProductQuery(params: RawParams): ProductListQuery {
  const { page: _page, limit: _limit, ...rest } = normalizeProductQuery({
    search: first(params.search),
    categoryId: first(params.categoryId),
    sort: first(params.sort) as ProductSort | undefined,
    minPrice: first(params.minPrice) as unknown as number | undefined,
    maxPrice: first(params.maxPrice) as unknown as number | undefined,
  })
  return rest
}

export function buildQueryString(query: ProductListQuery): string {
  const q = normalizeProductQuery(query)
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(q)) {
    if (value !== undefined) params.set(key, String(value))
  }
  return params.toString()
}
