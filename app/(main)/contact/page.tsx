import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { CONTACT, whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us | Desi Chauka",
  description:
    "Order, replacement ya bulk order ke liye Desi Chauka se jud-iye. WhatsApp, phone ya email par hum 24 ghante mein jawab dete hain.",
};

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "Sabse tez jawab",
    value: CONTACT.phoneDisplay,
    href: whatsappLink(),
    external: true,
  },
  {
    icon: Phone,
    title: "Phone",
    detail: CONTACT.hours,
    value: CONTACT.phoneDisplay,
    href: CONTACT.phoneHref,
  },
  {
    icon: Mail,
    title: "Email",
    detail: "24 ghante mein reply",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      {/* Header */}
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
          Need Help?
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
         We are here to help you.
        </p>
      </header>

      {/* Quick channels */}
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {channels.map(({ icon: Icon, title, detail, value, href, external }) => (
          <li key={title}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex h-full items-start gap-4 rounded-lg border bg-card p-5 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">{title}</span>
                <span className="block text-sm text-muted-foreground">{detail}</span>
                <span className="mt-1 block truncate text-sm font-medium text-primary group-hover:underline">
                  {value}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Form (the "parchi") + info */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px]">
        {/* The one memorable element: a paper slip with a stitched, dashed edge */}
        {/* <section
          aria-labelledby="form-title"
          className="rounded-xl border-2 border-dashed border-primary/50 bg-card p-6 shadow-sm sm:p-8"
        >
          <h2 id="form-title" className="mb-6 text-2xl font-semibold">
            Parchi likh dijiye
          </h2>
          <ContactForm />
        </section> */}

        <aside className="space-y-8 bg-card px-4 rounded-md container ">
          <div>
            <h2 className="mb-3 flex items-center gap-2 font-semibold text-xl">
              <MapPin className="size-4 text-primary" /> Address
            </h2>
            <address className="space-y-0.5 text-sm not-italic text-muted-foreground">
              {CONTACT.address.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
          </div>

          <div>
            <h2 className="mb-3 flex items-center gap-2 font-semibold">
              <Clock className="size-4 text-primary" /> Time
            </h2>
            <p className="text-sm text-muted-foreground">{CONTACT.hours}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Raat ya Sunday ko aaya message agle working din reply hota hai.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-semibold">Important Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/orders" prefetch={false} className="text-primary underline-offset-4 hover:underline">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/replacement-policy" prefetch={false} className="text-primary underline-offset-4 hover:underline">
                  Replacement & refund policy
                </Link>
              </li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground">{CONTACT.fssai}</p>
        </aside>
      </div>
    </main>
  );
}
