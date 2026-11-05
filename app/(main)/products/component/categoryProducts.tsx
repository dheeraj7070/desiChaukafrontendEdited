import { getProductsByCategory } from "@/lib/product";
import { Category } from "@/types/category";
import { ProductCard } from "./Card";

export async function ProductCategory({ keyword, title }: Category) {
  const products = await getProductsByCategory(keyword);
  return (
    <section className="scroll-mt-20">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
        </div>
        {products.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "item" : "items"}
          </p>
        )}
      </header>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          No products found. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-col-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
