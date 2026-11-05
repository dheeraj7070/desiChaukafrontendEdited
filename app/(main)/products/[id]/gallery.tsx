"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import type { GalleryImage } from "@/types/product"
import { cn } from "@/lib/utils"

export default function Gallery({
  images,
  name,
  badge,
}: {
  images: GalleryImage[]
  name: string
  badge?: string
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  if (images.length === 0) {
    return <div className="aspect-square rounded-2xl bg-muted" />
  }

  const hasMany = images.length > 1

  return (
    <div className="space-y-3">
      {/* Main carousel */}
      <div className="group relative overflow-hidden rounded-2xl border bg-muted">
        <Carousel setApi={setApi} opts={{ loop: hasMany }}>
          <CarouselContent className="ml-0">
            {images.map((img, i) => (
              <CarouselItem key={`${img.src}-${i}`} className="pl-0">
                <div className="relative aspect-square">
                  <img
                    src={img.src}
                    alt={`${name} - image ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                    className="absolute inset-0 size-full object-cover select-none"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {badge && (
          <span className="absolute top-3 left-3 rounded-sm bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground shadow-sm">
            {badge}
          </span>
        )}

        {hasMany && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => api?.scrollPrev()}
              className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 shadow-sm backdrop-blur transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => api?.scrollNext()}
              className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 shadow-sm backdrop-blur transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Dots (mobile) */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 sm:hidden">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full bg-background/80 shadow-sm transition-all",
                    i === current ? "w-5 bg-primary" : "w-1.5"
                  )}
                />
              ))}
            </div>

            {/* Counter (desktop) */}
            <span className="absolute right-3 bottom-3 hidden rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur sm:block">
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails (desktop) */}
      {hasMany && (
        <div className="hidden gap-2 overflow-x-auto pb-1 sm:flex">
          {images.map((img, i) => (
            <button
              key={`${img.thumb}-${i}`}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === current}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                i === current
                  ? "border-primary"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <img
                src={img.thumb}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}