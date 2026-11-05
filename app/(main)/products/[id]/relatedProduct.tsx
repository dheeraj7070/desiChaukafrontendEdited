import { ProductCard } from "../component/Card";
import { getRelatedProduct } from "@/lib/product";

export async function RelatedProduct({ id }: { id: string }) {
  const related = await getRelatedProduct(id);
  if (related.length < 1) return null;
  return (
    <>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold tracking-tight sm:text-2xl">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {related.map((p, i) => (
              // <div key={p.id}>{p.name} </div>
              <ProductCard key={p.id + i} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
