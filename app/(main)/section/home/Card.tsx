import Image from "next/image";
import Link from "next/link";
import {  ImageOff } from "lucide-react";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";

import { formatMoney } from "@/lib/format";
import { getPriceInfo } from "@/lib/product-utility";
// import { AddToCartButton } from "./addToCartButton";
import type Product from "@/types/product";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {

  const { id, name, description, thumbnail, currency = "INR" } = product;

  

  const { priceMinor, isRange } = getPriceInfo(product);

  const compareAt = product.compareAtPriceMinor;
  const hasDiscount = !isRange && compareAt != null && compareAt > priceMinor;
  const discount = hasDiscount
    ? Math.round(((compareAt - priceMinor) / compareAt) * 100)
    : 0;

  return (
    // @container/card: andar ke elements CARD ki width dekhkar size badlenge
    <Card className="@container/card group relative h-full w-full gap-0 overflow-hidden rounded-2xl border-border/60 bg-card py-0 shadow-sm transition-[transform,box-shadow] duration-300 active:scale-[0.98] md:hover:-translate-y-1 md:hover:shadow-lg">
      {/* ---------- Image: inset + rounded ---------- */}
      <div className="p-1.5 @[200px]/card:p-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={name}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 md:group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <ImageOff className="size-6 text-muted-foreground" />
            </div>
          )}

          {/* Discount: hamesha image ke upar (left), price row se bahar */}
          {hasDiscount && (
            <span className="absolute top-1.5 left-1.5 z-10 rounded-md bg-primary px-1.5 py-1 text-[10px] leading-none font-bold whitespace-nowrap text-primary-foreground shadow-sm @[200px]/card:top-2 @[200px]/card:left-2 @[200px]/card:text-xs">
              {discount}% OFF
            </span>
          )}

          {/* Wishlist: z-10 taaki stretched link ke upar rahe */}
          {/* <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => setWished((w) => !w)}
            className="absolute top-1.5 right-1.5 z-10 flex size-8 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur transition before:absolute before:-inset-1 active:scale-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none @[200px]/card:top-2 @[200px]/card:right-2 @[200px]/card:size-9 md:hover:scale-110"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                wished && "fill-primary text-primary",
              )}
            />
          </button> */}
        </div>
      </div>

      {/* ---------- Title + description (fixed heights = equal cards) ---------- */}
      <div className="px-3 pt-1">
        <CardTitle className="line-clamp-2 min-h-10 text-sm leading-5 font-semibold capitalize @[200px]/card:text-[15px]">
          <Link
            href={`/products/${id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            {name}
          </Link>
        </CardTitle>

        <p
          className="mt-0.5 line-clamp-1 h-4 text-xs leading-4 text-muted-foreground @[200px]/card:h-5 @[200px]/card:text-[13px] @[200px]/card:leading-5"
          aria-hidden={!description}
        >
          {description || "\u00A0"}
        </p>
      </div>

      {/* ---------- Price: ek hi line, kabhi wrap nahi ---------- */}
      <div className="px-3 pt-2">
        <div className="flex min-h-6 items-baseline gap-1.5 whitespace-nowrap">
          {isRange && (
            <span className="text-[11px] text-muted-foreground">From</span>
          )}
          <span className="text-base font-bold @[200px]/card:text-lg">
            {formatMoney(priceMinor, currency)}
          </span>
          {hasDiscount && (
            <del className="min-w-0 truncate text-xs text-muted-foreground">
              {formatMoney(compareAt, currency)}
            </del>
          )}
        </div>
      </div>

      {/* ---------- Action: mt-auto se hamesha bottom me ---------- */}
      <CardFooter className="relative z-10 mt-auto px-3 pt-2 pb-3">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}

// 'use client'
// import Image from "next/image";
// import { useState } from "react"
// import { Heart, ImageOff } from "lucide-react"
// import Link from 'next/link';
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { cn } from "@/lib/utils"
// import   Product  from "../../../types/product"
// // import { Prod } from "@/types/product";

// type ProductCardProps = Pick<
//   Product,
//   | "id"
//   | "name"
//   | "description"
//   | "priceMinor"
//   | "compareAtPriceMinor"
//   | "thumbnail"
//   | "currency"
// > & {
//   // label?: string
//   onAddToCart?: (id: Product["id"]) => void
// }

// function formatMoney(minor: number, currency = "INR") {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency,
//     maximumFractionDigits: minor % 100 === 0 ? 0 : 2,
//   }).format(minor / 100)
// }

// export function ProductCard({
//   id,
//   name,
//   description,
//   priceMinor,
//   compareAtPriceMinor,
//   thumbnail,
//   currency = "INR",

// }: Product) {
//   const [wished, setWished] = useState(false)

//   const hasDiscount =
//     compareAtPriceMinor != null && compareAtPriceMinor > priceMinor
//   const discount = hasDiscount
//     ? Math.round(((compareAtPriceMinor - priceMinor) / compareAtPriceMinor) * 100)
//     : 0

//   return (
//     <Link href={`/products/${id}`}>
//     <Card className="group gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
//       {/* Image */}
//       <div className="relative aspect-square w-full overflow-hidden bg-muted">
//          {thumbnail ? (
//           <Image
//             src={thumbnail}
//             alt={name}
//             fill
//             // sizes="128px"
//             className="object-cover"
//           />
//         ) : (
//           <div className="flex size-full items-center justify-center">
//             <ImageOff className="size-6 text-muted-foreground" />
//           </div>
//         )}

//         <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
//           {/* {label ? (
//             <Badge className="rounded-sm bg-accent text-accent-foreground shadow-sm">
//               {label}
//             </Badge>
//           ) : (
//             <span />
//           )} */}

//           <button
//             type="button"
//             aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
//             aria-pressed={wished}
//             onClick={() => setWished((w) => !w)}
//             className="flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
//           >
//             <Heart
//               className={cn(
//                 "size-5 transition-colors",
//                 wished && "fill-primary text-primary"
//               )}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Title + description */}
//       <CardHeader className="gap-1 px-4 pt-4 pb-0">
//         <CardTitle className="line-clamp-1 text-lg leading-snug font-semibold">
//           {name}
//         </CardTitle>
//         {description && (
//           <p className="line-clamp-2 text-sm text-muted-foreground">
//             {description}
//           </p>
//         )}
//       </CardHeader>

//       {/* Price */}
//       <CardContent className="px-4 pt-3 pb-0">
//         <div className="flex items-baseline gap-2">
//           <span className="text-xl font-bold">
//             {formatMoney(priceMinor, currency)}
//           </span>
//           {hasDiscount && (
//             <>
//               <del className="text-sm text-muted-foreground">
//                 {formatMoney(compareAtPriceMinor, currency)}
//               </del>
//               <span className="ml-auto rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs font-bold text-primary">
//                 {discount}% OFF
//               </span>
//             </>
//           )}
//         </div>
//       </CardContent>

//       {/* Action */}
//       <CardFooter className="p-4">
//         <Button
//           className="h-11 w-full bg-accent text-accent-foreground hover:bg-accent/90"
//           onClick={() => {}}
//         >
//           Add to Cart
//         </Button>
//       </CardFooter>
//     </Card>
//     </Link>
//   )
// }
