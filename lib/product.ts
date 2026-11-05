"use server";
import Product, {
  ProductsApiResponse,
  SingleProductResponse,
} from "@/types/product";
import { publicApi } from "./publicApi";
import { cache } from "react";


export async function getProductsByCategory(category: string) {
  try {
    const res = await publicApi<ProductsApiResponse>(
      "/getProducts",
      { params: { sort: category } },
      { revalidate: 60, tags: [`category:${category}`] },
    );

    const response = await res.json<ProductsApiResponse>();

    if (response.data.products.length < 1) return [];
    return response.data.products;
  } catch (error) {
    console.error(error)
    return [];
  }
}

export const getProduct = cache(async (id: string): Promise<Product | null> => {
  try {
    const res = await publicApi("/getProducts", {
      params: { productId: id },
      next: { revalidate: 60, tags: [`product:${id}`] },
    });

    if (!res.ok) return null;

    const decoRes = await res.json();
    //  console.log(decoRes);
    const { data } = decoRes as SingleProductResponse;
    // console.log(data?.products);
    return data?.products?.find((p) => p.id === id) ?? null;
  } catch (error){
    console.error(error);
    return null;
  }
});

export const getRelatedProduct = cache(
  async (productId: string): Promise<Product[]> => {
    try {
      const res = await publicApi("/getProducts", { next: { revalidate: 60 } });
      //(res);
      if (!res.ok) {
        console.log(await res.json())
        return [];
      }
      const { data } = (await res.json()) as ProductsApiResponse;
      return data.products.filter((p) => p.id !== productId).slice(0, 5);
    } catch (error) {
      console.error(error);
      return [];
    }
  },
);
