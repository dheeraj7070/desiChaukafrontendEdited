"use client"

import { useState, useTransition } from "react"
import { Loader2, Pencil, Star, Trash2 } from "lucide-react"
import { deleteAddressAction, setDefaultAddressAction } from "@/app/api/address/actions"
import { Button } from "@/components/ui/button"
import type { Address, AddressActionResult } from "@/types/address"

type Props = {
  address: Address
  onEdit: () => void
}

export function AddressActions({ address, onEdit }: Props) {
  const [pending, startTransition] = useTransition()
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function run(fn: () => Promise<AddressActionResult>) {
    startTransition(async () => {
      setError(null)
      const res = await fn()
      if (!res.ok) setError(res.message)
      else setConfirming(false)
    })
  }

  return (
    <div className="space-y-2">
      {confirming ? (
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm">Is address ko delete karein?</p>
          <Button
            size="sm"
            variant="destructive"
            disabled={pending}
            onClick={() => run(() => deleteAddressAction(address.id))}
          >
            {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
            Haan, delete karo
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() => {
              setConfirming(false)
              setError(null)
            }}
          >
            Nahi
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" disabled={pending} onClick={onEdit}>
            <Pencil className="size-4" aria-hidden /> Edit
          </Button>
          {!address.isDefault && (
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => run(() => setDefaultAddressAction(address.id))}
            >
              {pending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <Star className="size-4" aria-hidden />
              )}
              Default banao
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-destructive"
            disabled={pending}
            onClick={() => setConfirming(true)}
          >
            <Trash2 className="size-4" aria-hidden /> Delete
          </Button>
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
