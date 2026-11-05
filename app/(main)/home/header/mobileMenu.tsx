"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, ShoppingBag, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/navLinks";
import { cn } from "@/lib/utils";
import logo from "@/lib/assets/logo.webp";

const row =
  "flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold text-primary transition-colors active:bg-muted md:hover:bg-muted";

export default function MobileMenu() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Open menu"
          className="size-10 shrink-0 rounded-full md:hidden"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[85%] max-w-xs gap-0 overflow-y-auto p-0"
      >
        {/* Header: logo + naam + tagline. pr-12: Sheet ke close (X) button ke liye jagah */}
        <SheetHeader className="border-b bg-brand-soft p-4 pr-12 text-left">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="" // naam seedha saath me likha hai, alt ki zarurat nahi
              sizes="56px"
              className="size-14 shrink-0 object-contain mix-blend-multiply drop-shadow-sm dark:mix-blend-normal"
            />
            <div className="min-w-0">
              <SheetTitle className="font-serif text-lg font-bold tracking-[0.06em] whitespace-nowrap text-primary">
                DESI CHAUKA
              </SheetTitle>
              <SheetDescription className="mt-0.5 text-xs leading-snug">
                बिहार का स्वाद • घर का प्यार
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-col gap-0.5 p-2">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.location);
            return (
              // SheetClose: link dabate hi drawer band ho jaayega
              <SheetClose asChild key={l.id}>
                <Link
                  href={l.location}
                  aria-current={active ? "page" : undefined}
                  className={cn(row, active && "bg-secondary")}
                >
                  {l.text}
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mx-4 border-t" />

        <div className="flex flex-col gap-0.5 p-2">
          <SheetClose asChild>
            <Link
              href="/profile"
              prefetch={false}
              aria-current={isActive("/profile") ? "page" : undefined}
              className={cn(row, isActive("/profile") && "bg-secondary")}
            >
              <User className="size-5" /> Profile
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/cart"
              prefetch={false}
              aria-current={isActive("/cart") ? "page" : undefined}
              className={cn(row, isActive("/cart") && "bg-secondary")}
            >
              <Heart className="size-5" /> Cart
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/cart" prefetch={false} className={row}>
              <ShoppingBag className="size-5" /> Order
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
