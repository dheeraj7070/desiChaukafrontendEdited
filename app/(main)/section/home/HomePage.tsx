// app/section/home/HomePage.tsx
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Leaf,
  PackageOpen,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHomeData } from "@/app/api/home/actions";
import { buildHomeFeed } from "./build-home-feed";
import { CategoryBlock } from "./CategoryBlock";
import { ProductSection } from "./ProductSection";

/* ---------- Chhote helper components ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/15 via-primary/5 to-background">
      {/* soft glow, sirf decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 size-64 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 text-center md:px-6 md:pb-24 md:pt-20 md:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
          <Leaf className="size-3.5" />
          Bihar ka asli swaad
        </span>

        <h1 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:mx-0 md:text-5xl">
          Ghar jaisa achaar aur pakwaan,{" "}
          <span className="text-primary">seedha aapke ghar tak</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base md:mx-0">
          Traditional recipes, shuddh masale aur bina milawat ka swaad —
          chuniye apni pasand ka achaar, papad aur bahut kuchh.
        </p>

        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:justify-start">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/products">
              Abhi order karein
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="#categories">Categories dekhein</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

const TRUST_ITEMS = [
  { icon: Leaf, title: "Shuddh & Homemade", desc: "Traditional recipe" },
  { icon: Truck, title: "Safe Delivery", desc: "Aapke darwaze tak" },
  { icon: Wallet, title: "COD & Online", desc: "Jaise aapko theek lage" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "Razorpay se surakshit" },
] as const;

function TrustStrip() {
  return (
    <div className="relative z-10 -mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border shadow-sm md:-mt-10 md:grid-cols-4">
      {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="flex items-center gap-3 bg-card p-3 md:p-4"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary md:size-10">
            <Icon className="size-4 md:size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold md:text-sm">{title}</p>
            <p className="truncate text-[11px] text-muted-foreground md:text-xs">
              {desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StateMessage({
  icon: Icon,
  title,
  message,
  action,
}: {
  icon: typeof AlertTriangle;
  title: string;
  message?: string;
  action?: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-8" />
      </span>
      <h1 className="mt-5 text-xl font-semibold">{title}</h1>
      {message && (
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </main>
  );
}

/* ---------- Main page ---------- */

export async function HomePage() {
  const result = await getHomeData();

  if (!result.ok) {
    return (
      <StateMessage
        icon={AlertTriangle}
        title="Home page load nahi ho paya"
        message={result.message}
        action={
          <Button asChild className="rounded-full">
            <Link href="/">Dobara koshish karein</Link>
          </Button>
        }
      />
    );
  }

  const feed = buildHomeFeed(result.data);

  if (feed.length === 0) {
    return (
      <StateMessage
        icon={PackageOpen}
        title="Abhi kuchh dikhane ko nahi hai"
        message="Jaldi hi naya stock aa raha hai, thodi der baad dekhiye."
      />
    );
  }

  return (
    <main className="w-full">
      {/* <Hero /> */}

      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {/* <TrustStrip /> */}

        <div
          id="categories"
          className="scroll-mt-20 space-y-12 py-10 md:space-y-16 md:py-14"
        >
          {feed.map((item) => (
            <div
              key={item.key}
              className="animate-in fade-in-0 slide-in-from-bottom-3 duration-500"
            >
              {item.kind === "section" ? (
                <ProductSection section={item.section} />
              ) : (
                <CategoryBlock categories={item.categories} />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}