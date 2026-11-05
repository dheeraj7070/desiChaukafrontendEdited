import { Suspense } from "react"
import { ProductCategory } from "./categoryProducts"
import { getCategories } from "@/lib/category"
import { CategorySkeleton } from "./skeleton/categorySkeleton"

export async function CategoryList() {
  const categories = await getCategories()

  return (
    <>
      {categories.map((c) => (
        <Suspense key={c.id} fallback={<CategorySkeleton title={c.title} />}>
          <ProductCategory {...c} />
        </Suspense>
      ))}
    </>
  )
}
    


