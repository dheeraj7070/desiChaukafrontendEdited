// app/section/home/ProductSection.tsx
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "./Card"
import type { HomeSection } from "@/types/home"
import { sectionSeeAllHref } from "./links"
import { toCardProduct } from "./to-card-product"

export function ProductSection({ section }: { section: HomeSection }) {
  if (section.products.length === 0) return null

  const seeAll = sectionSeeAllHref(section)
  const headingId = `home-section-${section.id}`

  return (
    <section aria-labelledby={headingId} className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-primary md:h-8" />
          <h2
            id={headingId}
            className="line-clamp-1 text-xl font-bold tracking-tight md:text-3xl"
          >
            {section.title.trim()}
          </h2>
        </div>

        {/* {seeAll && (
          <Link
            href={seeAll}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-background px-3.5 py-2 text-sm font-medium text-primary transition active:scale-95 md:hover:bg-primary md:hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            See all
            <ArrowRight className="size-4 transition-transform md:group-hover:translate-x-0.5" aria-hidden />
          </Link>
        )} */}
      </div>

      {/* Products */}
      <div className="relative">
        <ul
          className="
            -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pt-1 pb-3
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            md:mx-0 md:grid md:snap-none md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0
            lg:grid-cols-5
          "
        >
          {section.products.map((product) => (
            <li
              key={product.id}
              // phone: 62% (~236px) | bada phone: 44% | tablet: 34% | md+: grid
              className="flex w-[62%] shrink-0 snap-start min-[480px]:w-[44%] sm:w-[34%] md:w-auto"
            >
              <div className="flex w-full">
                <ProductCard product={toCardProduct(product)} />
              </div>
            </li>
          ))}
        </ul>

        {/* right-edge fade: aur cards hain, ye hint deta hai (sirf mobile) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -right-4 w-8 bg-gradient-to-l from-background to-transparent md:hidden"
        />
      </div>
    </section>
  )
}