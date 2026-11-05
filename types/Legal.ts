export type LegalListItem = string | { label: string; text: string };

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: LegalListItem[] }
  | { type: "ol"; items: LegalListItem[] }
  | { type: "note"; text: string };

export type LegalSection = {
  title?: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  /** route of this page, used to hide it from the "more pages" links */
  href: string;
  title: string;
  /** meta description */
  description: string;
  tagline?: string;
  lead?: string;
  effectiveDate?: string;
  intro?: string[];
  sections: LegalSection[];
  closing?: string;
};
