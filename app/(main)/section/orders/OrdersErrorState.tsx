import { RetryButton } from "./RetryButton"

export function OrdersErrorState({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm text-muted-foreground">{message}</p>
      <RetryButton />
    </div>
  )
}
