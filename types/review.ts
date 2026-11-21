export type ReviewProduct = {
  id: string;
  name: string;
  image: string | null;
};

export type Review = {
  id: string;
  productId: string;
  firstName: string,
  userId: string;
  orderId: string;
  rating: number;
  title: string;
  comment: string;
  status: 'active' | (string & {});
  createdAt: string;
  updatedAt: string;
};

type ReviewPagination = {
  page: number;
  limit: number;
  totalCount: number;
  hasMore: boolean;
  nextPage: number | null;
}

export type ReviewsApiResponse = {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  pagination: ReviewPagination;
}

