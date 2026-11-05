import Link from "next/link"
import { PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyOrders() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <PackageOpen className="size-10 text-muted-foreground" aria-hidden />
      <h2 className="text-lg font-semibold">Abhi tak koi order nahi</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Jab aap kuchh order karoge, wo yahan dikhega.
      </p>
      <Button asChild>
        <Link href="/products">Shopping shuru karo</Link>
      </Button>
    </div>
  )
}
