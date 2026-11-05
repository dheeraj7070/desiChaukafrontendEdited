import { RetryButton } from "./RetryButton"

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <h1 className="text-lg font-semibold">Products load nahi ho paye</h1>
      <p className="text-sm text-muted-foreground">{message}</p>
      <RetryButton />
    </div>
  )
}
