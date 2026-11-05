"use client"

import { useState } from "react"
import { MapPinPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddressCard } from "@/app/(main)/section/address/AddressCard"
import { AddressForm } from "@/app/(main)/section/address/AddressForm"
import type { Address } from "@/types/address"
import { AddressActions } from "./AddressActions"

type Mode = { kind: "idle" } | { kind: "add" } | { kind: "edit"; id: string }

/**
 * Add/edit form list ke andar hi khulta hai (dialog nahi). Save ke baad server action
 * page ko revalidate karta hai, isliye `addresses` prop apne aap naya aa jaata hai.
 */
export function AddressSection({ addresses }: { addresses: Address[] }) {
  const [mode, setMode] = useState<Mode>({ kind: "idle" })
  const close = () => setMode({ kind: "idle" })

  return (
    <section aria-labelledby="addresses-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="addresses-heading" className="text-lg font-bold tracking-tight md:text-xl">
            Saved addresses
          </h2>
          {addresses.length > 0 && (
            <p className="text-sm text-muted-foreground">{addresses.length} saved</p>
          )}
        </div>
        {mode.kind !== "add" && (
          <Button onClick={() => setMode({ kind: "add" })}>
            <MapPinPlus className="size-4" aria-hidden /> Naya address
          </Button>
        )}
      </div>

      {mode.kind === "add" && (
        <AddressForm
          autoFocus
          forceDefault={addresses.length === 0}
          onSaved={close}
          onCancel={close}
        />
      )}

      {addresses.length === 0 && mode.kind !== "add" && (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="font-medium">Abhi koi address save nahi hai</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Address jodne se checkout tez ho jaata hai.
          </p>
        </div>
      )}

      <ul className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => {
          const editing = mode.kind === "edit" && mode.id === address.id
          return (
            <li key={address.id} className={editing ? "md:col-span-2" : undefined}>
              {editing ? (
                <AddressForm autoFocus address={address} onSaved={close} onCancel={close} />
              ) : (
                <AddressCard
                  address={address}
                  footer={
                    <AddressActions
                      address={address}
                      onEdit={() => setMode({ kind: "edit", id: address.id })}
                    />
                  }
                />
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
