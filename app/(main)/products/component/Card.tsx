"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Heart, ImageOff } from "lucide-react"
import { Card, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { formatMoney } from "@/lib/format"
import { getPriceInfo } from "@/lib/product-utility"
import { AddToCartButton } from "./addToCartButton"
import type Product from "@/types/product"

export function ProductCard({ product }: { product: Product }) {
  const { id, name, description, thumbnail, currency = "INR" } = product
  const [wished, setWished] = useState(false)

  const { priceMinor, isRange } = getPriceInfo(product)

  // Discount sirf tab dikhao jab variants ki price range na ho
  const compareAt = product.compareAtPriceMinor
  const hasDiscount = !isRange && compareAt != null && compareAt > priceMinor
  const discount = hasDiscount
    ? Math.round(((compareAt - priceMinor) / compareAt) * 100)
    : 0

  return (
    <Card className="group relative h-full  gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={name}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <ImageOff className="size-6 text-muted-foreground" />
          </div>
        )}

        {/* z-10: stretched link ke UPAR rahe */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-end p-3">
          <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => setWished((w) => !w)}
            className="flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Heart
              className={cn(
                "size-5 transition-colors",
                wished && "fill-primary text-primary"
              )}
            />
          </button>
        </div>
      </div>

      {/* Title + description + price: ek hi block, gap sirf yahan se control hota hai */}
      <div className="flex flex-1 flex-col gap-1 px-4 pt-3">
        <h3 className="line-clamp-2 text-lg leading-snug font-semibold">
          {/* Stretched link: after:inset-0 se poora card clickable ho jaata hai */}
          <Link
            href={`/products/${id}`}
            prefetch={false}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            {name}
          </Link>
        </h3>

        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}

        <div className="mt-auto flex items-baseline gap-2">
          {isRange && (
            <span className="text-sm text-muted-foreground">From</span>
          )}
          <span className="text-xl font-bold">
            {formatMoney(priceMinor, currency)}
          </span>
          {hasDiscount && (
            <>
              <del className="text-sm text-muted-foreground">
                {formatMoney(compareAt, currency)}
              </del>
              <span className="ml-auto rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs font-bold text-primary">
                {discount}% OFF
              </span>
            </>
          )}
        </div>
      </div>

      {/* Action: z-10 taaki link layer ke upar rahe */}
      <CardFooter className="relative z-10 py-4 px-2 bg-transparent">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  )
}