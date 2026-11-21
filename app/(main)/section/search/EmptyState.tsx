import Link from "next/link"
import { SearchX } from "lucide-react"

export function EmptyState({ search }: { search?: string }) {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <SearchX className="size-10 text-muted-foreground" aria-hidden />
      <h1 className="text-lg font-semibold">
        {search ? <>“{search}” No product found</> : "No product found"}
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Check Spelling  and try again.
      </p>
      {search && (
        <Link href="/" className="text-sm font-medium text-accent-foreground hover:underline">
          Go to home
        </Link>
      )}
    </div>
  )
}
