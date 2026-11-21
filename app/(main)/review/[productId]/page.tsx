import type { Metadata } from "next";
import Image from "next/image";
import { ReviewForm } from "@/components/review/review-form";
import { getMyReview, getReviewProduct } from "@/lib/reviews";
import { getProduct } from "@/lib/product";

export const metadata: Metadata = { title: "Review likhiye | Desi Chauka" };

// Server component: product header is static HTML. It never re-renders when the
// user types, picks stars or submits, because only <ReviewForm> is a client island.
export default async function ReviewPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  // Both requests run in parallel.
  const [product, review] = await Promise.all([
    getProduct(productId),
    getMyReview(productId),
  ]);

  // console.log(review);
  

  if (!product) return <p>No Products</p>

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <header className="flex items-center gap-4 rounded-lg border bg-card p-4">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
          {product.thumbnail && (
            <Image src={product.thumbnail} alt={product.name} fill sizes="80px" className="object-cover" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">
            {review ? "Aapka review" : "Review likhiye"}
          </p>
          <h1 className="truncate text-xl font-semibold">{product.name}</h1>
        </div>
      </header>

      <section className="mt-8">
        <ReviewForm productId={product.id} review={review} />
      </section>
    </main>
  );
}


