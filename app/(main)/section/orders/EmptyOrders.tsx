import Link from "next/link"
import { PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyOrders() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <PackageOpen className="size-10 text-muted-foreground" aria-hidden />
      <h2 className="text-lg font-semibold">No orders</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Explore Product and place order
      </p>
      <Button asChild>
        <Link href="/">Start shopping.</Link>
      </Button>
    </div>
  )
}
