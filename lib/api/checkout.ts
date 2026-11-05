import "server-only"
import { requestEnvelope, type ApiResult } from "@/lib/envelope"
import type { Address } from "@/types/address"
import type {
  CheckoutData,
  PlaceOrderData,
  PlaceOrderInput,
} from "@/types/checkout"

type RawAddress = Address & { userId?: string }
type RawCheckout = Omit<CheckoutData, "addresses" | "defaultAddress"> & {
  addresses: RawAddress[]
  defaultAddress: RawAddress | null
}

function stripUserId(a: RawAddress): Address {
  const { userId: _userId, ...address } = a
  return address
}

/** GET /orders/checkout (protected) - cart, addresses, shipping, payment methods */
export async function fetchCheckout(): Promise<ApiResult<CheckoutData>> {
  const res = await requestEnvelope<RawCheckout>("/orders/checkout")
  if (!res.ok) return res
  const { addresses, defaultAddress, ...rest } = res.data
  return {
    ok: true,
    data: {
      ...rest,
      addresses: addresses.map(stripUserId),
      defaultAddress: defaultAddress ? stripUserId(defaultAddress) : null,
    },
  }
}

/** POST /checkout (protected) - order banata hai; razorpay mein Razorpay order bhi */
export function placeOrder(input: PlaceOrderInput): Promise<ApiResult<PlaceOrderData>> {
  return requestEnvelope<PlaceOrderData>("/orders/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      addressId: input.addressId,
      paymentMethod: input.paymentMethod,
    }),
  })
}
