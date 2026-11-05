import Link from "next/link";
import type {
  LegalBlock,
  LegalDoc,
  LegalListItem,
} from "@/types/Legal";

const LINKS = [
  { href: "/about", label: "About us" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Replacement & Refund Policy" },
];

function Item({ item }: { item: LegalListItem }) {
  if (typeof item === "string") return <>{item}</>;
  return (
    <>
      <strong className="font-semibold text-foreground">{item.label}</strong>{" "}
      {item.text}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p className="leading-7 text-muted-foreground">{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 leading-7 text-muted-foreground marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i}>
              <Item item={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 leading-7 text-muted-foreground marker:font-medium marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i}>
              <Item item={item} />
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <p className="rounded-md border-l-4 border-primary bg-muted p-4 text-sm leading-6 text-foreground">
          {block.text}
        </p>
      );
  }
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const otherLinks = LINKS.filter((l) => l.href !== doc.href);

  return (
    <article>
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
        {doc.tagline && (
          <p className="mt-3 text-lg font-medium text-primary">{doc.tagline}</p>
        )}
        {doc.lead && (
          <p className="mt-1 text-sm text-muted-foreground">{doc.lead}</p>
        )}
        {doc.effectiveDate && (
          <p className="mt-2 text-sm text-muted-foreground">
            Effective date: {doc.effectiveDate}
          </p>
        )}
      </header>

      <div className="mt-8 space-y-4">
        {doc.intro?.map((text, i) => (
          <p key={i} className="leading-7 text-muted-foreground">
            {text}
          </p>
        ))}
      </div>

      {doc.sections.map((section, i) => (
        <section key={i} className="mt-8 space-y-4">
          {section.title && (
            <h2 className="text-xl font-semibold tracking-tight">
              {section.title}
            </h2>
          )}
          {section.blocks.map((block, j) => (
            <Block key={j} block={block} />
          ))}
        </section>
      ))}

      {doc.closing && (
        <p className="mt-10 text-lg font-semibold tracking-tight">
          {doc.closing}
        </p>
      )}

      <nav
        aria-label="More pages"
        className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t pt-6 text-sm"
      >
        {otherLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-medium text-primary hover:underline"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </article>
  );
}
