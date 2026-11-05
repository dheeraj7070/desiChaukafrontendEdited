import { RetryButton } from "./RetryButton"

export function ProfileErrorState({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-14 text-center">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{message}</p>
      <RetryButton />
    </div>
  )
}
