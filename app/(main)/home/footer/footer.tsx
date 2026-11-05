// components/Footer.tsx  (server component, "use client" ki zarurat nahi)
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import logo from "@/lib/assets/logo.webp";
import {
  FOOTER_BRAND,
  FOOTER_CONTACT,
  FOOTER_GROUPS,
  FOOTER_LEGAL,
  FOOTER_SOCIAL,
} from "@/lib/footerlinks";

const linkClass =
  "inline-flex min-h-9 items-center text-sm text-brand-butter/75 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none";

/** Internal link = next/link, baaki (https, tel, mailto) = normal <a> */
function SmartLink({
  href,
  className,
  children,
  label,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  const external = /^(https?:|mailto:|tel:)/.test(href);

  if (!external) {
    return (
      <Link href={href} className={className} aria-label={label}>
        {children}
      </Link>
    );
  }
  const isWeb = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function FooterBrand() {
  const social = FOOTER_SOCIAL.filter((s) => s.location);

  return (
    <div>
      <Link
        href="/"
        aria-label={`${FOOTER_BRAND.name} home`}
        className="inline-flex items-center gap-3 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Image
          src={logo}
          alt=""
          sizes="64px"
          className="size-16 shrink-0 rounded-full bg-white object-contain"
        />
        <span className="flex flex-col leading-tight">
          <b className="font-serif text-xl font-bold tracking-[0.06em] text-brand-butter">
            {FOOTER_BRAND.name}
          </b>
          <small className="mt-1 text-xs text-brand-butter/70">
            {FOOTER_BRAND.tagline}
          </small>
        </span>
      </Link>

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-butter/70">
        {FOOTER_BRAND.about}
      </p>

      {social.length > 0 && (
        <ul aria-label="Social media" className="mt-5 flex flex-wrap gap-2">
          {social.map((s) => (
            <li key={s.id}>
              <SmartLink
                href={s.location}
                className="inline-flex h-9 items-center rounded-full border border-white/15 px-4 text-sm font-medium text-brand-butter transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                {s.text}
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FooterContact() {
  const { phone, whatsapp, email, address } = FOOTER_CONTACT;
  const rows = [
    phone && {
      id: "phone",
      icon: Phone,
      text: phone,
      href: `tel:${phone.replace(/[^\d+]/g, "")}`,
    },
    whatsapp && {
      id: "whatsapp",
      icon: MessageCircle,
      text: "Chat on WhatsApp",
      href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
    },
    email && { id: "email", icon: Mail, text: email, href: `mailto:${email}` },
    address && { id: "address", icon: MapPin, text: address, href: "" },
  ].filter(Boolean) as {
    id: string;
    icon: typeof Phone;
    text: string;
    href: string;
  }[];

  if (rows.length === 0) return null;

  return (
    <ul className="mt-6 space-y-1">
      {rows.map(({ id, icon: Icon, text, href }) => (
        <li key={id}>
          {href ? (
            <SmartLink href={href} className={`${linkClass} gap-2.5`}>
              <Icon className="size-4 shrink-0 text-accent" aria-hidden />
              {text}
            </SmartLink>
          ) : (
            <span className="flex items-start gap-2.5 py-1.5 text-sm text-brand-butter/75">
              <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              {text}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const legal = [
    FOOTER_LEGAL.fssai && `FSSAI Lic. No. ${FOOTER_LEGAL.fssai}`,
    FOOTER_LEGAL.gstin && `GSTIN ${FOOTER_LEGAL.gstin}`,
  ].filter(Boolean) as string[];

  return (
    <footer className="mt-16 bg-brand-footer md:mt-24">
      {/* logo ke akshar jaisi amber -> orange patti */}
      <div aria-hidden className="h-1 bg-brand-gradient" />

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-6 md:px-6 md:pt-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:gap-16">
          {/* Brand + contact */}
          <div>
            <FooterBrand />
            <FooterContact />
          </div>

          {/* Link groups: FOOTER_GROUPS se, jitne groups utne columns */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] content-start gap-x-6 gap-y-8">
            {FOOTER_GROUPS.map((group) => (
              <nav key={group.id} aria-label={group.title}>
                <h3 className="mb-2 font-serif text-base font-semibold text-accent">
                  {group.title}
                </h3>
                <ul>
                  {group.links.map((l) => (
                    <li key={l.id}>
                      <SmartLink href={l.location} className={linkClass}>
                        {l.text}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 pb-[env(safe-area-inset-bottom)] text-xs text-brand-butter/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">
            © {year} {FOOTER_BRAND.name}. All rights reserved.
          </p>
          {legal.length > 0 && (
            <p className="m-0 flex flex-wrap gap-x-4 gap-y-1">
              {legal.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}