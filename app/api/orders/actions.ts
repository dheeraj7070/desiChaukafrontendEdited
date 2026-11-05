"use server"

import { fetchOrder, fetchOrders } from "@/lib/api/orders"
import type { ApiResult } from "@/lib/envelope"
import type { Order, OrderListData, OrderListQuery } from "@/types/order"

/** Pehla page (server) aur infinite scroll ke agle pages (client) */
export async function loadOrdersAction(
  query: OrderListQuery,
): Promise<ApiResult<OrderListData>> {
  return fetchOrders(query)
}

export async function getOrderAction(id: string): Promise<ApiResult<OrderListData>> {
  if (typeof id !== "string" || !id.trim() || id.length > 100) {
    return { ok: false, code: "NOT_FOUND", message: "Order not found." }
  }
  return fetchOrder(id.trim())
}
