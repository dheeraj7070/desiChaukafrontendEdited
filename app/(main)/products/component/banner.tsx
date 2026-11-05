import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const banners = [
  {
    id: "pickles",
    eyebrow: "Bestsellers",
    title: "Pickles made the Mithila way",
    text: "Hand-ground spices, slow matured, straight from Bihar.",
    cta: "Shop pickles",
    className: "bg-primary text-primary-foreground",
  },
  {
    id: "festive",
    eyebrow: "Festive season",
    title: "Gift boxes for every celebration",
    text: "Pakwaan, sweets and sample boxes, packed with care.",
    cta: "Explore gifts",
    className: "bg-accent text-accent-foreground",
  },
];

export function BannerCarousel() {
  return (
    <Carousel opts={{ loop: true }} className="overflow-hidden rounded-2xl">
      <CarouselContent className="ml-0">
        {banners.map((b) => (
          <CarouselItem key={b.id} className="pl-0">
            <div
              className={`relative flex h-52 items-center overflow-hidden px-6 sm:h-72 sm:px-14 ${b.className}`}
            >
              {/* decorative circles */}
              <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-background/10" />
              <div className="pointer-events-none absolute -right-4 -bottom-24 size-72 rounded-full bg-background/10" />

              <div className="relative max-w-xl">
                <p className="text-xs font-bold tracking-widest uppercase opacity-80">
                  {b.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl leading-tight font-bold sm:text-4xl">
                  {b.title}
                </h2>
                <p className="mt-2 hidden text-sm opacity-90 sm:block sm:text-base">
                  {b.text}
                </p>
                <Button asChild variant="secondary" className="mt-4">
                  <a href="#products">{b.cta}</a>
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 hidden sm:inline-flex" />
      <CarouselNext className="right-3 hidden sm:inline-flex" />
    </Carousel>
  );
}
