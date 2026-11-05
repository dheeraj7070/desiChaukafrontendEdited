import type { HomeCategory, HomeSection } from "@/types/home"

// Apne frontend routes ke hisaab se yahin badalna - baaki code ko chhoone ki zaroorat nahi.
export function categoryHref(category: Pick<HomeCategory, "id">) {
  return `/products?categoryId=${category.id}`
}

/** "See all" link; new_arrivals ke liye API mein target nahi hai, isliye null */
export function sectionSeeAllHref(section: HomeSection): string | null {
  switch (section.type) {
    case "tag":
      return `/products-by-tag?tagId=${section.tagId}&page=1&limit=20`
    case "category":
      return `/products?categoryId=${section.categoryId}`
    default:
      return null
  }
}
