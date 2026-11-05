import Link from "next/link"
import { Loader2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatMoney } from "@/lib/format"
import { totalSavingsMinor } from "@/lib/checkout-utils"
import type { CheckoutData } from "@/types/checkout"
import { isCartProblem, type PlaceError } from "./use-place-order"

type Props = {
  data: CheckoutData
  method: string | null
  placing: boolean
  /** Button disabled hone ki wajah (nahi hai to null) */
  blockedReason: string | null
  error: PlaceError | null
  onPlace: () => void
}

export function CheckoutSummary({ data, method, placing, blockedReason, error, onPlace }: Props) {
  const money = (n: number) => formatMoney(n, data.currency)
  const savings = totalSavingsMinor(data.items)
  const showProgress = !data.freeShippingApplied && data.amountForFreeShippingMinor > 0
  const progress = Math.min(
    100,
    Math.round((data.subtotalMinor / Math.max(1, data.freeShippingThresholdMinor)) * 100),
  )

  const label =
    method === "cod" ? `Place order · ${money(data.totalMinor)}` : `Pay ${money(data.totalMinor)}`

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({data.itemCount} {data.itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-medium">{money(data.subtotalMinor)}</span>
        </div>

        {savings > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">You save</span>
            <span className="rounded bg-primary px-1.5 py-0.5 font-medium text-primary-foreground">
              {money(savings)}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          {data.shippingMinor === 0 ? (
            <span className="font-medium text-emerald-700 dark:text-emerald-400">Free</span>
          ) : (
            <span className="font-medium">{money(data.shippingMinor)}</span>
          )}
        </div>

        {showProgress && (
          <div className="rounded-lg bg-muted/60 p-3">
            <p className="text-xs">
              <span className="font-semibold">{money(data.amountForFreeShippingMinor)}</span> ka
              aur saaman jodo, shipping free ho jaayegi.
            </p>
            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-border"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Free shipping progress"
            >
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <Separator />

        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>{money(data.totalMinor)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3">
        {error && (
          <div
            role="alert"
            className="w-full rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
          >
            <p>{error.message}</p>
            {isCartProblem(error.code) && (
              <Link href="/cart" className="mt-1 inline-block font-medium underline">
                Cart dekho
              </Link>
            )}
          </div>
        )}

        <Button
          size="lg"
          className="w-full bg-accent"
          disabled={placing || !!blockedReason}
          onClick={onPlace}
        >
          {placing && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {placing ? "Please wait..." : label}
        </Button>

        {blockedReason && !placing && (
          <p className="w-full text-center text-xs text-muted-foreground">{blockedReason}</p>
        )}

        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="size-3.5" aria-hidden />
          {method === "cod" ? "Paise delivery par dene hain" : "Razorpay se secure payment"}
        </p>

        <Button asChild variant="outline" className="w-full">
          <Link href="/cart">Cart par wapas jao</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
