"use client"

import { useActionState, useEffect, useId, useRef, type ReactNode } from "react"
import { Loader2 } from "lucide-react"
import { createAddressAction, updateAddressAction } from "@/app/api/address/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  ADDRESS_TYPES,
  type Address,
  type AddressFieldName,
  type AddressFormState,
} from "@/types/address"

type Props = {
  /** Diya ho to edit mode, nahi to naya address */
  address?: Address
  /** User ka pehla address: backend ise apne aap default bana deta hai */
  forceDefault?: boolean
  autoFocus?: boolean
  submitLabel?: string
  /** Save hone par saved address ke saath. Checkout par ise select karne ke liye use karo */
  onSaved?: (address: Address) => void
  onCancel?: () => void
  className?: string
}

const INITIAL: AddressFormState = { status: "idle" }

const TYPE_LABEL: Record<string, string> = { home: "Home", work: "Work", other: "Other" }

/**
 * Dialog se bandha hua nahi hai - kahin bhi (profile, checkout, page, sheet) rakh sakte ho.
 * Create aur update dono ke liye ek hi form.
 */
export function AddressForm({
  address,
  forceDefault = false,
  autoFocus = false,
  submitLabel,
  onSaved,
  onCancel,
  className,
}: Props) {
  const uid = useId()
  const isEdit = !!address

  const action = address ? updateAddressAction.bind(null, address.id) : createAddressAction
  const [state, formAction, pending] = useActionState(action, INITIAL)

  // Parent ka naya function har render par aata hai - ref se effect baar-baar nahi chalta
  const onSavedRef = useRef(onSaved)
  onSavedRef.current = onSaved
  useEffect(() => {
    if (state.status === "success" && state.address) onSavedRef.current?.(state.address)
  }, [state])

  const errors = state.fieldErrors ?? {}
  const value = (name: string): string => {
    const typed = state.values?.[name]
    if (typed !== undefined) return typed
    const existing = address?.[name as keyof Address]
    return typeof existing === "string" ? existing : ""
  }
  const type = value("addressType") || "home"

  const field = (name: AddressFieldName) => ({
    id: `${uid}-${name}`,
    name,
    defaultValue: value(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
  })

  return (
    <form
      action={formAction}
      className={cn("space-y-4 rounded-xl border bg-card p-4 md:p-5", className)}
    >
      <h3 className="text-base font-semibold">{isEdit ? "Address edit karo" : "Naya address"}</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-fullName`} label="Poora naam" error={errors.fullName}>
          <Input
            {...field("fullName")}
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            autoFocus={autoFocus}
          />
        </Field>

        <Field id={`${uid}-phone`} label="Phone number" error={errors.phone}>
          <Input
            {...field("phone")}
            required
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="10 digit"
            autoComplete="tel-national"
          />
        </Field>

        <Field
          id={`${uid}-addressLine1`}
          label="Address line 1"
          error={errors.addressLine1}
          className="sm:col-span-2"
        >
          <Input
            {...field("addressLine1")}
            required
            minLength={3}
            maxLength={200}
            placeholder="Ghar / flat number, gali, mohalla"
            autoComplete="address-line1"
          />
        </Field>

        <Field
          id={`${uid}-addressLine2`}
          label="Address line 2 (optional)"
          error={errors.addressLine2}
          className="sm:col-span-2"
        >
          <Input {...field("addressLine2")} maxLength={200} autoComplete="address-line2" />
        </Field>

        <Field
          id={`${uid}-landmark`}
          label="Landmark (optional)"
          error={errors.landmark}
          className="sm:col-span-2"
        >
          <Input {...field("landmark")} maxLength={150} placeholder="Mandir, school, petrol pump..." />
        </Field>

        <Field id={`${uid}-city`} label="City" error={errors.city}>
          <Input {...field("city")} required minLength={2} maxLength={100} autoComplete="address-level2" />
        </Field>

        <Field id={`${uid}-state`} label="State" error={errors.state}>
          <Input {...field("state")} required minLength={2} maxLength={100} autoComplete="address-level1" />
        </Field>

        <Field id={`${uid}-postalCode`} label="Pincode" error={errors.postalCode}>
          <Input
            {...field("postalCode")}
            required
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="6 digit"
            autoComplete="postal-code"
          />
        </Field>

        <fieldset className="space-y-1.5">
          <legend className="text-sm font-medium">Address ka type</legend>
          <div className="flex flex-wrap gap-2 pt-1">
            {ADDRESS_TYPES.map((t) => (
              <label key={t} className="cursor-pointer">
                <input
                  type="radio"
                  name="addressType"
                  value={t}
                  defaultChecked={type === t}
                  className="peer sr-only"
                />
                <span className="block rounded-full border px-4 py-1.5 text-sm transition-colors peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:font-semibold peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                  {TYPE_LABEL[t]}
                </span>
              </label>
            ))}
          </div>
          {errors.addressType && <p className="text-xs text-destructive">{errors.addressType}</p>}
        </fieldset>
      </div>

      {forceDefault ? (
        <p className="text-xs text-muted-foreground">
          Ye aapka pehla address hai, ye apne aap default ban jaayega.
        </p>
      ) : address?.isDefault ? (
        <p className="text-xs text-muted-foreground">
          Ye aapka default address hai. Default badalne ke liye kisi aur address ko default karo.
        </p>
      ) : (
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isDefault"
            defaultChecked={state.values?.isDefault === "on"}
            className="size-4 accent-[var(--primary)]"
          />
          Is address ko default banao
        </label>
      )}

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={pending}>
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {pending ? "Save ho raha hai..." : (submitLabel ?? (isEdit ? "Update karo" : "Address save karo"))}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={pending}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string
  label: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
