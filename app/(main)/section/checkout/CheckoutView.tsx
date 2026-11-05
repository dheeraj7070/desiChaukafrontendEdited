"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { hasCartIssues } from "@/lib/checkout-utils"
import type { CheckoutData, PaymentMethodId } from "@/types/checkout"
import { AddressStep } from "./AddressStep"
import { CheckoutSummary } from "./CheckoutSummary"
import { PaymentStep } from "./PaymentStep"
import { ReviewItems } from "./ReviewItems"
import { usePlaceOrder } from "./use-place-order"

const SUPPORTED = new Set(["razorpay", "cod"])

export function CheckoutView({ data }: { data: CheckoutData }) {
  const methods = data.paymentMethods.filter((m) => SUPPORTED.has(m))

  const [addressId, setAddressId] = useState<string | null>(
    data.defaultAddress?.id ?? data.addresses[0]?.id ?? null,
  )
  const [method, setMethod] = useState<string | null>(
    methods.includes("razorpay") ? "razorpay" : (methods[0] ?? null),
  )
  const { placing, error, place } = usePlaceOrder()

  // Naya address abhi props mein na aaya ho to default par tik jaate hain
  const selected =
    data.addresses.find((a) => a.id === addressId) ??
    data.defaultAddress ??
    data.addresses[0] ??
    null

  const issues = hasCartIssues(data)

  let blockedReason: string | null = null
  if (issues) blockedReason = "Cart ke kuchh items available nahi hain. Pehle cart theek karo."
  else if (!selected) blockedReason = "Delivery address chuno."
  else if (!method || !methods.includes(method)) blockedReason = "Payment method chuno."

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
      <div className="space-y-6">
        {issues && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          >
            Cart ke kuchh items ab available nahi hain ya stock kam hai.{" "}
            <Link href="/cart" className="font-medium underline">
              Cart theek karo
            </Link>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>1. Delivery address</CardTitle>
          </CardHeader>
          <CardContent>
            <AddressStep
              addresses={data.addresses}
              selectedId={selected?.id ?? null}
              onSelect={setAddressId}
              disabled={placing}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Payment method</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentStep methods={methods} value={method} onChange={setMethod} disabled={placing} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>3. Review items ({data.itemCount})</CardTitle>
            <Link href="/cart" className="text-sm text-primary hover:underline">
              Edit cart
            </Link>
          </CardHeader>
          <CardContent>
            <ReviewItems items={data.items} currency={data.currency} />
          </CardContent>
        </Card>
      </div>

      <CheckoutSummary
        data={data}
        method={method}
        placing={placing}
        blockedReason={blockedReason}
        error={error}
        onPlace={() => {
          if (!selected || !method) return
          void place({
            addressId: selected.id,
            paymentMethod: method as PaymentMethodId,
            prefill: { name: selected.fullName, contact: selected.phone },
          })
        }}
      />
    </div>
  )
}
