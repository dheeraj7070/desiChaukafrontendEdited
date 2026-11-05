import "server-only";
import { requestEnvelope, type ApiResult } from "@/lib/envelope";
import type {
  Order,
  OrderAddress,
  OrderListData,
  OrderListQuery,
  OrderPagination,
} from "@/types/order";

// Backend jo bhejta hai (extra private fields ke saath)
type RawAddress = OrderAddress & { userId?: string };
type RawOrder = Omit<Order, "shippingAddress"> & {
  userId?: string;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  shippingAddress: RawAddress;
};

/** userId aur Razorpay IDs client tak jaate hi nahi */
function sanitize(raw: RawOrder): Order {
  const {
    userId: _u,
    razorpayOrderId: _ro,
    razorpayPaymentId: _rp,
    shippingAddress,
    ...rest
  } = raw;
  const { userId: _au, ...address } = shippingAddress;
  return { ...rest, shippingAddress: address };
}

function buildQuery({ page, limit }: OrderListQuery): string {
  const params = new URLSearchParams();
  const p = Number.isFinite(page) ? Math.max(1, Math.trunc(page as number)) : 1;
  const l = Number.isFinite(limit)
    ? Math.min(50, Math.max(1, Math.trunc(limit as number)))
    : 20;
  params.set("page", String(p));
  params.set("limit", String(l));
  return params.toString();
}

/** GET /orders (protected) */
export async function fetchOrders(
  query: OrderListQuery = {},
): Promise<ApiResult<OrderListData>> {
  const res = await requestEnvelope<{
    orders: RawOrder[];
    pagination: OrderPagination;
  }>(`/orders?${buildQuery(query)}`);
  if (!res.ok) return res;
  return {
    ok: true,
    data: {
      orders: res.data.orders.map(sanitize),
      pagination: res.data.pagination,
    },
  };
}

/**
 * GET /orders/:id (protected)
 * NOTE: endpoint aur response shape maan liya gaya hai - data.order ya seedha order dono chalte hain.
 */
export async function fetchOrder(
  id: string,
): Promise<ApiResult<OrderListData>> {
  const res = await requestEnvelope<OrderListData>(`/orders`, {
    params: { orderNumber: id },
  });
  if (!res.ok) return res;
  const data = res.data as OrderListData;

  return { ok: true, data: data };
}
