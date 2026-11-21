import "server-only";
import { requestEnvelope } from "@/lib/envelope";
import type { Review, ReviewProduct } from "@/types/review";
import Product from "@/types/product";

/**
 * ADAPT: I have not seen your requestEnvelope signature or your review endpoints.
 * Only the two paths below and the `res.data` shape may need a small change.
 */

// Product name + image for the header. (Use your existing product fetch if you have one.)
export async function getReviewProduct(
  productId: string,
): Promise<ReviewProduct | null> {
  const res = await requestEnvelope<Product>(`/products/${productId}`);

  if (res.ok) {
    const p = res.data;
    return {
      id: p.id,
      name: p.name,
      image: p.thumbnail ?? p.images?.[0] ?? null,
    };
  }

  return null;
}

// The logged-in user's own review for this product, or null if none yet.
export async function getMyReview(productId: string): Promise<Review | null> {
  const res = await requestEnvelope< Review | null >(
    `/product/${productId}/reviews/me`,
  );
  //  console.log(res);
  if (res.ok) {
    const data = res.data;
   
    return data ?? null;
  }
  return null;
}
