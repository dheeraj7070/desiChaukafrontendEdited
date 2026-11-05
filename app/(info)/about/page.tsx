import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { about } from "@/lib/legal/about";

export const metadata: Metadata = {
  title: `${about.title} | Deshi Chauka`,
  description: about.description,
};

export default function Page() {
  return <LegalDocument doc={about} />;
}
