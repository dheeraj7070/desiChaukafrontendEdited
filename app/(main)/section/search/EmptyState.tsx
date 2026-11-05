import Link from "next/link"
import { SearchX } from "lucide-react"

export function EmptyState({ search }: { search?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <SearchX className="size-10 text-muted-foreground" aria-hidden />
      <h1 className="text-lg font-semibold">
        {search ? <>“{search}” ke liye kuchh nahi mila</> : "Abhi koi product nahi hai"}
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Spelling check karo ya koi aur shabd try karo, jaise “thekua” ya “achar”.
      </p>
      {search && (
        <Link href="/products" className="text-sm font-medium text-primary hover:underline">
          Saare products dekho
        </Link>
      )}
    </div>
  )
}
