export type HomeCategory = {
  id: string
  name: string
  slug: string
}

export type HomeProductImage = {
  key: string
  original: string
  thumbnail: string
  medium: string
  large: string
}

export type HomeProduct = {
  id: string
  name: string
  slug: string
  priceMinor: number
  compareAtPriceMinor: number | null
  currency: string
  price: number
  compareAtPrice: number | null
  /** 300x300 URL, null agar product ke paas image nahi */
  thumbnail: string | null
  images: HomeProductImage[]
}

export type HomeSectionType = "tag" | "category" | "new_arrivals"

type HomeSectionBase = {
  id: string
  title: string
  position: number
  itemLimit: number
  status: "active" | "archived"
  products: HomeProduct[]
}

export type HomeSection = HomeSectionBase &
  (
    | { type: "tag"; tagId: string; categoryId: null }
    | { type: "category"; categoryId: string; tagId: null }
    | { type: "new_arrivals"; tagId: null; categoryId: null }
  )

export type HomeData = {
  categories: HomeCategory[]
  sections: HomeSection[]
}

/** Home page ka final render order: section ya categories ka block */
export type HomeFeedItem =
  | { kind: "section"; key: string; section: HomeSection }
  | { kind: "categories"; key: string; categories: HomeCategory[] }
