"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"
import type { Variant } from "@/types/product"
import {
  findVariant,
  getOptionGroups,
  isOptionAvailable,
} from "@/lib/variants"

type Props = {
  variants: Variant[]
  selectedId: string
  onSelect: (variantId: string) => void
  pending?: boolean
}

const pill =
  "rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors"

export function VariantPicker({ variants, selectedId, onSelect, pending }: Props) {
  const uid = useId() // radio ke `name` ko unique rakhne ke liye
  const selected = variants.find((v) => v.id === selectedId)
  if (!selected) return null

  const groups = getOptionGroups(variants)

  if (variants.length < 2) {
    return (
      <div className="mt-5 space-y-3">
        {groups.map((group) => (
          <div key={group.key}>
            <p className="mb-2 text-sm font-semibold">{group.label}</p>
            <span className={cn(pill, "inline-block border-primary bg-primary/5")}>
              {selected.options[group.key]}
            </span>
          </div>
        ))}
      </div>
    )
  }

  function choose(key: string, value: string) {
    const next = findVariant(variants, { ...selected!.options, [key]: value })
    if (next) onSelect(next.id)
  }

  return (
    <div className={cn("mt-5 space-y-4", pending && "opacity-70")}>
      {groups.map((group) => (
        <fieldset key={group.key}>
          <legend className="mb-2 text-sm font-semibold">
            {group.label}:{" "}
            <span className="font-normal text-muted-foreground">
              {selected.options[group.key]}
            </span>
          </legend>

          <div className="flex flex-wrap gap-2">
            {group.values.map((value) => {
              const available = isOptionAvailable(
                variants,
                selected.options,
                group.key,
                value,
              )
              return (
                <label
                  key={value}
                  className={cn(
                    pill,
                    "cursor-pointer",
                    "has-checked:border-primary has-checked:bg-primary/5",
                    "has-focus-visible:ring-2 has-focus-visible:ring-ring",
                    !available && "cursor-not-allowed opacity-40 line-through",
                  )}
                >
                  <input
                    type="radio"
                    name={`${uid}-${group.key}`}
                    value={value}
                    checked={selected.options[group.key] === value}
                    disabled={!available}
                    onChange={() => choose(group.key, value)}
                    className="sr-only"
                  />
                  {value}
                </label>
              )
            })}
          </div>
        </fieldset>
      ))}
    </div>
  )
}