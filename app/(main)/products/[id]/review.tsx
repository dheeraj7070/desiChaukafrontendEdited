// components/reviews/review-card.tsx
import { Star } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Review } from "@/types/review";


const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  const safeRating = Math.min(Math.max(Math.round(rating), 0), max);

  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${safeRating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "size-4",
            i < safeRating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  );
}

type ReviewCardProps = {
  review: Review;
  className?: string;
};

export function ReviewCard({ review, className }: ReviewCardProps) {
  const { firstName, rating, title, comment, createdAt, updatedAt } = review;
  const isEdited = createdAt !== updatedAt;
  const initial = firstName?.trim().charAt(0).toUpperCase() || "?";

  return (
    <Card className={cn("shadow-none", className)}>
      <CardContent className="space-y-3 p-5">
        <div className="flex justify-center flex-col gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
            >
              {initial}
            </div>
            <div className="min-w-0">
              <CardTitle className="truncate text-sm font-semibold leading-tight ">
                {firstName}
              </CardTitle>
              <time
                dateTime={createdAt}
                className="text-xs text-muted-foreground"
              >
                {formatDate(createdAt)}
                {isEdited && " · Edited"}
              </time>
            </div>
          </div>
          <StarRating rating={rating} />
        </div>

        {title && (
          <h3 className="text-base font-semibold leading-snug">{title}</h3>
        )}

        {comment && (
          <p className="whitespace-pre-line break-words text-sm leading-relaxed text-muted-foreground">
            {comment}
          </p>
        )}
      </CardContent>
    </Card>
  );
}