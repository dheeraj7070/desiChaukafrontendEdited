import Link from "next/link"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Profile } from "@/types/profile"
import { LogoutButton } from "./LogoutButton"

export function ProfileHeader({ profile }: { profile: Profile }) {
  const first = profile.firstName.trim()
  const last = profile.lastName.trim()
  const fullName = [first, last].filter(Boolean).join(" ") || "Customer"
  const initials = ((first[0] ?? "") + (last[0] ?? "")).toUpperCase() || "U"

  return (
    <section className="rounded-xl border bg-card p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span
            aria-hidden
            className="grid size-14 shrink-0 place-items-center rounded-full bg-primary font-serif text-lg font-bold text-primary-foreground md:size-16 md:text-xl"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight capitalize md:text-2xl">
              {fullName}
            </h1>
            <p className="truncate text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/orders">
              <Package className="size-4" aria-hidden /> My orders
            </Link>
          </Button>
          <LogoutButton />
        </div>
      </div>

      <dl className="mt-6 grid gap-4 border-t pt-5 text-sm sm:grid-cols-3">
        <Detail label="First name" value={first || "-"} capitalize />
        <Detail label="Last name" value={last || "-"} capitalize />
        <Detail label="Email" value={profile.email} />
      </dl>
    </section>
  )
}

function Detail({
  label,
  value,
  capitalize,
}: {
  label: string
  value: string
  capitalize?: boolean
}) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={capitalize ? "truncate font-medium capitalize" : "truncate font-medium"}>
        {value}
      </dd>
    </div>
  )
}
