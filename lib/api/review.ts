import "server-only";
import { ReviewsApiResponse } from "@/types/review";
import { publicRequestEnvelope } from "../envelope";

export async function getReviews(productId: string) {
  const response = await publicRequestEnvelope<ReviewsApiResponse>(
    `/product/${productId}/reviews`,
  );
  // console.log(response);
  return response;
}
