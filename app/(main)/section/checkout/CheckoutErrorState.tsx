import { RetryButton } from "./RetryButton"

export function CheckoutErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <h1 className="text-lg font-semibold">Checkout load nahi ho paya</h1>
      <p className="text-sm text-muted-foreground">{message}</p>
      <RetryButton />
    </div>
  )
}
