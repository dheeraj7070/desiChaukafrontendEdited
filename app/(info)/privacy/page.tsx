import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { privacyPolicy } from "@/lib/legal/privacy";

export const metadata: Metadata = {
  title: `${privacyPolicy.title} | Deshi Chauka`,
  description: privacyPolicy.description,
};

export default function Page() {
  return <LegalDocument doc={privacyPolicy} />;
}
