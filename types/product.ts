export interface ProductImage {
  key: string;
  original: string;
  thumbnail: string;
  medium: string;
  large: string;
}

export interface ProductMetadata {
  packSize?: string;
  imageSource?: string;
  [key: string]: unknown;
}

// types/product.ts
export type Variant = {
  id: string;
  productId: string;
  sku: string;
  options: Record<string, string>; // { packSize: "Box of 24" }
  priceMinor: number;
  compareAtPriceMinor: number | null;
  status: string; // "active" ...
  stock?: number; // jab backend de
};
export type ProductStatus = "active" | "inactive" | "archived" | (string & {});
export type GalleryImage = { src: string; thumb: string };

export default interface Product {
  id: string;
  categoryId: string;
  name: string;
  aliases: string[];
  slug: string;
  description: string;
  sku: string;
  priceMinor: number;
  compareAtPriceMinor: number;
  currency: string;
  status: ProductStatus;
  variants?: Variant[];
  /** JSON stringified ProductMetadata payload */
  metadata: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  images: ProductImage[];
}

export interface Pagination {
  page: number;
  limit: number;
  hasMore: boolean;
  nextPage: number | null;
}

export interface ProductsData {
  products: Product[];
  pagination: Pagination;
}

export interface ProductsApiResponse {
  success: boolean;
  message: string;
  data: ProductsData;
  status: number;
}

export type SingleProductResponse = {
  success: string;
  message: string;
  status: string;
  data?: {
    products?: Product[];
  };
};

export function getGalleryImages(p: Product): GalleryImage[] {
  if (p.images?.length) {
    return p.images.map((i) => ({ src: i.medium, thumb: i.thumbnail }));
  }
  return p.thumbnail ? [{ src: p.thumbnail, thumb: p.thumbnail }] : [];
}

export function parseMetadata(raw?: string): Record<string, string> {
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
