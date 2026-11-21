import Link from "next/link";
import Image from "next/image";
import logo from "@/lib/assets/logo.webp";

export default function Brand() {
  return (
    <Link
      href="/"
      aria-label="Desi Chauka home"
      className="group flex min-w-0 shrink-0 items-center gap-2 rounded-lg py-1 pr-1 transition-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background sm:gap-2.5"
    >
      <BrandLogo />
      <BrandName />
    </Link>
  );
}

function BrandLogo() {
  return (
    <Image
      src={logo}
      // alt khali: link par aria-label pehle se hai, screen reader do baar na padhe
      alt=""
      priority
      sizes="(min-width: 768px) 56px, 44px"
      className="size-11 shrink-0 object-contain drop-shadow-sm transition-transform duration-300 sm:size-12 md:size-14 md:group-hover:rotate-[-4deg] md:group-hover:scale-105"
    />
  );
}

function BrandName() {
  return (
    <span className="flex min-w-0 flex-col leading-none font-sans">
      <b className="whitespace-nowrap text-[17px] font-bold tracking-[0.06em] text-primary sm:text-xl md:text-2xl">
        DESI CHAUKA
      </b>
      <small className="mt-1 hidden whitespace-nowrap text-[11px] leading-tight text-muted-foreground sm:block md:text-xs">
        माटी की खुशबू, परंपरा का स्वाद
      </small>
    </span>
  );
}
