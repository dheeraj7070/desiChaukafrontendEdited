import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { terms } from "@/lib/legal/terms";

export const metadata: Metadata = {
  title: `${terms.title} | Deshi Chauka`,
  description: terms.description,
};

export default function Page() {
  return <LegalDocument doc={terms} />;
}
