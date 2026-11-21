import { Star } from "lucide-react";
import { ReviewCard } from "./review";
import { getReviews } from "@/lib/api/review";

export async function ReviewList({ productId }: { productId: string }) {
  const res = await getReviews(productId);

  if (!res.ok) return null;

  const { reviews, averageRating, totalReviews } = res.data;
  const roundedAverage = Math.round(averageRating);

  return (
    <section className="space-y-6 mt-12" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-xl font-semibold tracking-tight">
        Reviews &amp; Ratings
      </h2>

      {totalReviews > 0 && (
        <div className="flex items-center gap-4 ">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold leading-none tabular-nums">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-lg text-muted-foreground">/ 5</span>
          </div>

          <div className="space-y-1">
            <div
              className="flex items-center gap-0.5"
              role="img"
              aria-label={`Average rating ${averageRating.toFixed(1)} out of 5`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  aria-hidden="true"
                  className={
                    i < roundedAverage
                      ? "size-5 fill-amber-400 text-amber-400"
                      : "size-5 fill-muted text-muted-foreground/40"
                  }
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No Reviews.
        </p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}