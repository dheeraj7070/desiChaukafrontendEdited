import { Suspense } from "react";
import Brand from "./brand";
import MobileMenu from "./mobileMenu";
import NavActions from "./navAction";
import SearchBar from "./search";
import { NavActionsSkeleton } from "../navActionsSkeleton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-3 px-4 py-3 md:flex-nowrap md:gap-x-8 md:py-4 lg:px-8">
        <MobileMenu />
        <Brand />
        {/* Phone: poori width ki alag row (order-last). Desktop: beech mein */}
        <div className="order-last w-full md:order-none md:flex md:flex-1 md:justify-center">
          <SearchBar />
        </div>
       
        <Suspense fallback={<NavActionsSkeleton />}>
          <NavActions />
        </Suspense>
      </div>
    </header>
  );
}
