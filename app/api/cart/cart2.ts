"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fetchApi } from "@/lib/fetchApi";
import { Unauthorized, type ApiError } from "@/types/Api";

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; code?: "UNAUTHORIZED" };

/**
 * Teeno actions ka common kaam: API call, error ko ActionResult mein badalna,
 * aur success par layout revalidate karna (header badge + cart page + buttons sync).
 */
async function cartRequest(
  path: string,
  init: Parameters<typeof fetchApi>[1],
  fallbackError: string,
): Promise<ActionResult> {
  try {
    const res = await fetchApi(path, init);

    if (!res.ok) {
      const body = await res.json<ApiError>().catch(() => null);
      return { ok: false, error: body?.error?.message ?? fallbackError };
    }
  } catch (error) {
    if (error instanceof Unauthorized) {
      return {
        ok: false,
        error: "Please sign in to continue.",
        code: "UNAUTHORIZED",
      };
    }
    console.error(`cart request failed: ${path}`, error);
    return { ok: false, error: "Network error. Please try again." };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

const JSON_HEADERS = { "Content-Type": "application/json" };

/* ---------- add ---------- */

const addSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1).optional(),
  quantity: z.number().int().min(1).max(99),
});

export type AddToCartInput = z.infer<typeof addSchema>;

export async function addToCart(input: AddToCartInput): Promise<ActionResult> {
  const parsed = addSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid request" };

  // NOTE: backend ka field name `quantity` hi hona chahiye; alag ho to yahan map karo.
  return cartRequest(
    "/cart/items",
    {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify(parsed.data),
    },
    "Could not add to cart",
  );
}

/* ---------- update quantity ---------- */

const updateSchema = z.object({
  id: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
});

export async function updateQuantity(input: {
  id: string;
  quantity: number;
}): Promise<ActionResult> {
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid quantity" };

  const { id, quantity } = parsed.data;
  return cartRequest(
    `/cart/items/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({ quantity }),
    },
    "Could not update quantity",
  );
}

/* ---------- remove ---------- */

export async function removeItemFromCart(
  itemId: string,
): Promise<ActionResult> {
  if (!itemId) return { ok: false, error: "Invalid item" };

  return cartRequest(
    `/cart/items/${encodeURIComponent(itemId)}`,
    { method: "DELETE" },
    "Could not remove item",
  );
}