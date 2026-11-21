import Link from "next/link";

import { notFound } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  HandHeart,
  ShieldCheck,
  Truck,
  Wheat,
} from "lucide-react";

import { formatMoney } from "@/lib/format";
import { getGalleryImages, parseMetadata } from "@/types/product";
import Gallery from "./gallery";
import Purchase from "./purchase";
import { getProduct } from "@/lib/product";
import { Suspense } from "react";
import { RelatedProduct } from "./relatedProduct";
import { CategorySkeleton } from "../component/skeleton/categorySkeleton";
import { getActiveVariants, resolveVariant } from "@/lib/variants";
import { VariantSelector } from "../component/variant-selector";
import { Metadata } from "next";
import { ReviewListSkeleton } from "./reviewSkeleton";
import { ReviewList } from "./reviewLoader";

const IMG_CDN = "https://image.sonukr.in/cdn-cgi/image";

function ogImage(key?: string) {
  if (!key) return "/og-image.jpg"; // fallback
  return `${IMG_CDN}/width=1200,height=630,fit=pad,background=white,format=jpeg,quality=80/${key}`;
}

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return { title: "Product not found" };

  const description =
    product.description?.slice(0, 160) || "माटी की खुशबू, परंपरा का स्वाद";
  const image = ogImage(product.images?.[0]?.key);

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      type: "website",
      siteName: "Desi Chauka",
      locale: "hi_IN",
      url: `/products/${id}`,
      images: [{ url: image, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [image],
    },
  };
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ variant?: string }>;
};

export default async function ProductPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { variant: variantId } = await searchParams;
  const product = await getProduct(id);

  //('product is ',product);

  if (!product || product.status !== "active") notFound();

  const variants = getActiveVariants(product.variants ?? []);
  const selected = resolveVariant(variants, variantId);

  const priceMinor = selected?.priceMinor ?? product.priceMinor;
  const mrp = selected?.compareAtPriceMinor ?? product.compareAtPriceMinor ?? 0;
  const sku = selected?.sku ?? product.sku;

  const hasDiscount = mrp > priceMinor;
  const savings = hasDiscount ? mrp - priceMinor : 0;
  const discount = hasDiscount ? Math.round((savings / mrp) * 100) : 0;

  const meta = parseMetadata(product.metadata);
  const images = getGalleryImages(product);

  const details = [
    { label: "Pack size", value: meta.packSize },
    { label: "SKU", value: product.sku },
    { label: "Also known as", value: product.aliases },
  ].filter((d) => d.value);

  const hasVariantsButNoneActive =
    (product.variants?.length ?? 0) > 0 && !selected;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: images.map((i) => i.src),
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: (priceMinor / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-6 pb-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1 text-sm text-muted-foreground"
      >
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="size-4 shrink-0" />
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="size-4 shrink-0" />
        <span className="line-clamp-1 text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Gallery
            images={images}
            name={product.name}
            badge={hasDiscount ? `${discount}% OFF` : undefined}
          />
        </div>

        {/* Buy box */}
        <div className="flex flex-col">
          <p className="text-xs font-bold tracking-widest text-primary uppercase">
            Desi Chauka
          </p>
          <h1 className="mt-2 font-serif text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-5 rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold">
                {formatMoney(priceMinor, product.currency)}
              </span>
              {hasDiscount && (
                <>
                  <del className="text-lg text-muted-foreground">
                    {formatMoney(mrp, product.currency)}
                  </del>
                  <span className="rounded-sm bg-primary/10 px-2 py-1 text-sm font-bold text-primary">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
            {hasDiscount && (
              <p className="mt-1 text-sm font-medium text-primary">
                You save {formatMoney(savings, product.currency)}
              </p>
            )}
          </div>

          {product.description && (
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          {/* Pack size */}
          {selected && (
            <VariantSelector variants={variants} selectedId={selected.id} />
          )}

          <Purchase
            productId={product.id}
            variantId={selected?.id}
            disabled={hasVariantsButNoneActive}
          />

          {/* Trust badges */}
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <Trust icon={<Truck className="size-5" />}>
              Free shipping above ₹699
            </Trust>
            <Trust icon={<ShieldCheck className="size-5" />}>
              Secure online payment
            </Trust>
            <Trust icon={<HandHeart className="size-5" />}>
              Homemade Bihari flavours
            </Trust>
            <Trust icon={<Wheat className="size-5" />}>
              Small-batch goodness
            </Trust>
          </ul>

          {/* Info sections */}
          <div className="mt-8">
            {details.length > 0 && (
              <Section title="Product details" defaultOpen>
                <dl className="divide-y">
                  {details.map((d) => (
                    <div
                      key={d.label}
                      className="grid grid-cols-[110px_1fr] gap-4 py-2.5 sm:grid-cols-[150px_1fr]"
                    >
                      <dt>{d.label}</dt>
                      <dd className="font-medium text-foreground capitalize">
                        {d.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Section>
            )}
            <Section title="Shipping">
              <ul className="list-disc space-y-1 pl-5">
                <li>Free shipping on orders above ₹699.</li>
                <li>Made in small batches.</li>
              </ul>
            </Section>
          </div>
        </div>
      </div>

      <Suspense fallback={<CategorySkeleton />}>
        <RelatedProduct id={product.id} />
      </Suspense>

      <Suspense fallback={<ReviewListSkeleton />}>
        <ReviewList productId={product.id} />
      </Suspense>
    </main>
  );
}

function Trust({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2.5">
      <span className="text-primary">{icon}</span>
      {children}
    </li>
  );
}

function Section({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-b first:border-t">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-4 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}
