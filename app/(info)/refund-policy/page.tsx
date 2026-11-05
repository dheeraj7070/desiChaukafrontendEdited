import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { refundPolicy } from "@/lib/legal/refund";

export const metadata: Metadata = {
  title: `${refundPolicy.title} | Deshi Chauka`,
  description: refundPolicy.description,
};

export default function Page() {
  return <LegalDocument doc={refundPolicy} />;
}
