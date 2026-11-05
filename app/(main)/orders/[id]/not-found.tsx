import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OrderNotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
      <h1 className="text-xl font-semibold">Order nahi mila</h1>
      <p className="text-sm text-muted-foreground">
        Ye order maujood nahi hai ya aapke account ka nahi hai.
      </p>
      <Button asChild>
        <Link href="/orders">My orders par jao</Link>
      </Button>
    </main>
  )
}
