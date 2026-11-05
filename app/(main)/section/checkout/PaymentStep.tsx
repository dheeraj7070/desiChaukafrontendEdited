"use client"

import { Banknote, CreditCard, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const OPTIONS: Record<string, { title: string; description: string; Icon: LucideIcon }> = {
  razorpay: {
    title: "Online payment",
    description: "UPI, cards, netbanking aur wallets - Razorpay se secure payment",
    Icon: CreditCard,
  },
  cod: {
    title: "Cash on delivery",
    description: "Saaman haath mein aane par paise do",
    Icon: Banknote,
  },
}

type Props = {
  methods: string[]
  value: string | null
  onChange: (method: string) => void
  disabled?: boolean
}

export function PaymentStep({ methods, value, onChange, disabled }: Props) {
  // Sirf wahi methods dikhate hain jinhe UI sambhalta hai
  const available = methods.filter((m) => m in OPTIONS)

  if (available.length === 0) {
    return (
      <p className="text-sm text-destructive">
        Abhi koi payment method available nahi hai. Thodi der baad try karo.
      </p>
    )
  }

  return (
    <div role="radiogroup" aria-label="Payment method" className="grid gap-3">
      {available.map((id) => {
        const { title, description, Icon } = OPTIONS[id]
        return (
          <label key={id} className="block cursor-pointer">
            <input
              type="radio"
              name="payment-method"
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
              disabled={disabled}
              className="peer sr-only"
            />
            <span
              className={cn(
                "flex items-start gap-3 rounded-xl border bg-card p-4 transition-shadow",
                "peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/40",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
              )}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted">
                <Icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-medium">{title}</span>
                <span className="block text-sm text-muted-foreground">{description}</span>
              </span>
            </span>
          </label>
        )
      })}
    </div>
  )
}
