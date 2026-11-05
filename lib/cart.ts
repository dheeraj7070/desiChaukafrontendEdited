"use server";
import { redirect } from "next/navigation";
import { Cart } from "@/types/cart";

import { requestEnvelope } from "./envelope";

export async function getCart() {
  const response = await requestEnvelope<Cart>("/cart");
  if (!response.ok) {
    if (response.code === "UNAUTHORIZED") {
      redirect("/login");
      return;
    }
    return response;
  }
  return response;
}
