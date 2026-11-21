"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveReview, type ReviewState } from "@/app/api/review/review";
import { StarRating } from "./star-rating";
import type { Review } from "@/types/review";
import { Input } from "../ui/input";

const initial: ReviewState = { status: "idle" };

export function ReviewForm({ productId, review }: { productId: string; review: Review | null }) {
  const [state, action, pending] = useActionState(saveReview, initial);
  const e = state.fieldErrors ?? {};

  // Prefill: existing review -> its values, none -> blank.
  // Textarea is UNCONTROLLED (defaultValue), so typing causes zero React re-renders.
  const rating = Number(state.values?.rating ?? review?.rating ?? 0);
  const comment = state.values?.comment ?? review?.comment ?? "";
  const title = state.values?.title ?? review?.title ?? "";
  return (
    <form action={action} noValidate className="space-y-6">
      <input type="hidden" name="productId" value={productId} />
      {review && <input type="hidden" name="reviewId" value={review.id} />}

      {state.status === "success" && (
        <p role="status" className="rounded-md border border-primary/30 bg-primary/10 p-3 text-sm">{state.message}</p>
      )}
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{state.message}</p>
      )}

      <div className="space-y-2">
        <Label>Your rating</Label>
        <StarRating name="rating" defaultValue={rating} />
        {e.rating && <p className="text-sm text-destructive">{e.rating}</p>}
      </div>

       <div className="space-y-2">
        <Label>Your Title</Label>
        <Input id="title" name="title" aria-invalid={!!e.title} defaultValue={title} />
        {e.title && <p className="text-sm text-destructive">{e.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Your review</Label>
        <Textarea
          id="comment"
          name="comment"
          rows={6}
          defaultValue={comment}
          placeholder="Swaad, packing, delivery. Jo bhi laga, likhiye."
          aria-invalid={!!e.comment}
        />
        {e.comment && <p className="text-sm text-destructive">{e.comment}</p>}
      </div>

      <Button type="submit" size="lg" disabled={pending}>
        {pending && <Loader2 className="animate-spin" />}
        {pending ? "Save ho raha hai…" : review ? "Review update karein" : "Review submit karein"}
      </Button>
    </form>
  );
}
