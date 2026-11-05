"use client"

import { useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { Variant } from "@/types/product"
import { VariantPicker } from "./variant-picker"

type Props = { variants: Variant[]; selectedId: string }

export function VariantSelector({ variants, selectedId }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [pending, startTransition] = useTransition()

  return (
    <VariantPicker
      variants={variants}
      selectedId={selectedId}
      pending={pending}
      onSelect={(id) =>
        startTransition(() => {
          router.replace(`${pathname}?variant=${id}`, { scroll: false })
        })
      }
    />
  )
}