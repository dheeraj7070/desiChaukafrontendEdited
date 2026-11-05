import Link from "next/link"
import { NAV_LINKS } from "@/lib/navLinks"

export default function NavLink() {
  return (
    <nav
      aria-label="Main"
      className="hidden h-14 items-center justify-center gap-[3.2vw] border-b border-border bg-background text-[15px] font-semibold md:flex"
    >
      {NAV_LINKS.map((l) => (
        <Link
          key={l.id}
          href={l.location}
          className="flex items-center text-primary hover:underline underline-offset-4"
        >
          {l.text}
        </Link>
      ))}
    </nav>
  )
}