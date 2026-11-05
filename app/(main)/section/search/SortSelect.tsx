"use client"

import { useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { ProductSort } from "@/types/product-list"

const OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "latest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
]

export function SortSelect({ value }: { value: ProductSort }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [pending, startTransition] = useTransition()

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Sort by</span>
      <select
        value={value}
        disabled={pending}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString())
          if (e.target.value === "latest") params.delete("sort")
          else params.set("sort", e.target.value)
          const qs = params.toString()
          startTransition(() =>
            router.replace(qs ? `/products?${qs}` : "/products", { scroll: false }),
          )
        }}
        className="h-9 rounded-md border border-input bg-card px-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25 focus-visible:outline-none disabled:opacity-60"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
