import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OrderNotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
      <h1 className="text-xl font-semibold">Order not found.</h1>
      <p className="text-sm text-muted-foreground">
       Order you are looking for does not exists.
      </p>
      <Button asChild>
        <Link href="/orders">Go to Orders</Link>
      </Button>
    </main>
  )
}
