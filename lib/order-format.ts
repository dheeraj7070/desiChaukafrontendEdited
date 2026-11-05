// Dates hamesha IST mein - server aur browser dono mein same output (hydration mismatch nahi).
const TZ = "Asia/Kolkata"

const dateTime = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: TZ,
})
const dateOnly = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: TZ })

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return ""
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? "" : dateTime.format(d)
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return ""
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? "" : dateOnly.format(d)
}

function humanizeKey(key: string): string {
  const spaced = key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim()
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase()
}

/** { packSize: "pack of 24" } -> "Pack size: pack of 24" */
export function formatOptions(options: Record<string, string> | null): string {
  if (!options) return ""
  return Object.entries(options)
    .map(([k, v]) => `${humanizeKey(k)}: ${v}`)
    .join(" · ")
}

export function paymentMethodLabel(method: string): string {
  switch (method) {
    case "razorpay":
      return "Online payment (Razorpay)"
    case "cod":
      return "Cash on delivery"
    default:
      return humanizeKey(method)
  }
}

/** Sirf http(s) links - backend se aaya URL `javascript:` jaisa kuchh na ho */
export function safeHttpUrl(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null
  } catch {
    return null
  }
}
