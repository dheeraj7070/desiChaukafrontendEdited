"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fetchApi } from "@/lib/fetchApi";
import { requestEnvelope } from "@/lib/envelope";
import { Review } from "@/types/review";

const schema = z.object({
  productId: z.string().min(1),
  reviewId: z.string().optional(),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating chuniye")
    .max(5, "Rating chuniye"),
  title: z
    .string()
    .trim()
    .min(3, "must be Atleast 3 characters long.")
    .max(200, "Title can't be longer than 200 characters long."),
  comment: z
    .string()
    .trim()
    .min(5, "Kam se kam 5 akshar likhiye")
    .max(1000, "Review 1000 akshar se chhota rakhiye"),
});

export type ReviewState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"rating" | "comment" | "title", string>>;
  values?: { rating?: string; comment?: string; title?: string };
};

export async function saveReview(
  _prev: ReviewState,
  formData: FormData,
): Promise<ReviewState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const values = { rating: raw.rating, comment: raw.comment };

  const parsed = schema.safeParse({
    ...raw,
    reviewId: raw.reviewId || undefined,
  });
  if (!parsed.success) {
    const fieldErrors: ReviewState["fieldErrors"] = {};
    for (const i of parsed.error.issues) {
      const k = i.path[0] as "rating" | "comment";
      if ((k === "rating" || k === "comment") && !fieldErrors[k])
        fieldErrors[k] = i.message;
    }
    return { status: "error", fieldErrors, values };
  }
  console.log(parsed.data);

  const { productId, reviewId, rating, comment, title } = parsed.data;

  // ADAPT: match your fetchApi signature and endpoints.
  // Existing review -> PATCH, no review yet -> POST.
  const res = await requestEnvelope<Review>(`/product/${productId}/reviews`, {
    method: "PUT",
    body: JSON.stringify({ rating, comment, title }),
  });

  if (!res.ok) {
    return {
      status: "error",
      message: res.message,
      values,
    };
  }

  // Targeted revalidation only. NOT revalidatePath("/", "layout"), which would
  // re-render header, cart badge and every other layout component.
  revalidatePath(`/review/${productId}`);
  // If your product page shows reviews, also: revalidatePath(`/products/<slug>`)

  return {
    status: "success",
    message: reviewId
      ? "Review update ho gaya."
      : "Review save ho gaya, shukriya!",
    values,
  };
}
