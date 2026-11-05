import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { HomeCategory } from "@/types/home"
import { categoryHref } from "./links"

// Har card ko alag rang, theme tokens se
const TONES = [
  "bg-primary/10",
  "bg-accent/30",
  "bg-secondary",
  "bg-muted",
] as const

export function CategoryBlock({ categories }: { categories: HomeCategory[] }) {
  return (
    <section aria-label="Shop by category" className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">
        Shop by category
      </h2>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, i) => (
          <li key={category.id}>
            <Card
              className={cn(
                "group relative h-full justify-center gap-0 border-0 p-5 py-6 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                TONES[i % TONES.length],
              )}
            >
              <Link
                href={categoryHref(category)}
                className="flex items-center justify-between gap-3 text-base font-semibold after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
              >
                <span className="line-clamp-2">{category.name}</span>
                <ArrowUpRight
                  className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
