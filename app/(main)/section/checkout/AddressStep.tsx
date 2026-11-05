"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPinPlus, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
// Profile wale zip ke reusable components
import { AddressCard } from "@/app/(main)/section/address/AddressCard"
import { AddressForm } from "@/app/(main)/section/address/AddressForm"
import type { Address } from "@/types/address"

type Mode = { kind: "idle" } | { kind: "add" } | { kind: "edit"; id: string }

type Props = {
  addresses: Address[]
  selectedId: string | null
  onSelect: (id: string) => void
  disabled?: boolean
}

export function AddressStep({ addresses, selectedId, onSelect, disabled }: Props) {
  const [mode, setMode] = useState<Mode>(addresses.length === 0 ? { kind: "add" } : { kind: "idle" })
  const close = () => setMode({ kind: "idle" })

  return (
    <div className="space-y-4">
      {addresses.length === 0 && mode.kind === "add" && (
        <p className="text-sm text-muted-foreground">
          Delivery ke liye pehle ek address jodo.
        </p>
      )}

      {addresses.length > 0 && (
        <ul
          role="radiogroup"
          aria-label="Delivery address"
          className="grid gap-4 md:grid-cols-2"
        >
          {addresses.map((address) => {
            if (mode.kind === "edit" && mode.id === address.id) {
              return (
                <li key={address.id} className="md:col-span-2">
                  <AddressForm
                    autoFocus
                    address={address}
                    onSaved={(saved) => {
                      onSelect(saved.id)
                      close()
                    }}
                    onCancel={close}
                  />
                </li>
              )
            }

            return (
              <li key={address.id}>
                <label className="block cursor-pointer">
                  <input
                    type="radio"
                    name="delivery-address"
                    value={address.id}
                    checked={address.id === selectedId}
                    onChange={() => onSelect(address.id)}
                    disabled={disabled}
                    className="peer sr-only"
                  />
                  <AddressCard
                    address={address}
                    className="h-full transition-shadow peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/40 peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
                    footer={
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={disabled}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setMode({ kind: "edit", id: address.id })
                        }}
                      >
                        <Pencil className="size-4" aria-hidden /> Edit
                      </Button>
                    }
                  />
                </label>
              </li>
            )
          })}
        </ul>
      )}

      {mode.kind === "add" ? (
        <AddressForm
          autoFocus={addresses.length > 0}
          forceDefault={addresses.length === 0}
          onSaved={(saved) => {
            onSelect(saved.id)
            close()
          }}
          onCancel={addresses.length > 0 ? close : undefined}
        />
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" disabled={disabled} onClick={() => setMode({ kind: "add" })}>
            <MapPinPlus className="size-4" aria-hidden /> Naya address jodo
          </Button>
          <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
            Saare addresses manage karo
          </Link>
        </div>
      )}
    </div>
  )
}
