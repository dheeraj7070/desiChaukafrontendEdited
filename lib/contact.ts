// Single source of truth for contact details.
// Replace the placeholders, then reuse in footer (lib/footerLinks.ts) and policy pages.
export const CONTACT = {
  whatsapp: "919999999999", // country code + number, no "+" or spaces
  phoneDisplay: "+91 99999 99999",
  phoneHref: "tel:+919999999999",
  email: "support@desichauka.in",
  address: ["Desi Chauka", "Your street / locality", "Patna, Bihar 800001"],
  hours: "Mon – Sat, 10 am to 7 pm",
  fssai: "FSSAI Lic. No. XXXXXXXXXXXXXX",
} as const;

export const whatsappLink = (text = "Namaste! Mujhe ek sawaal poochna tha.") =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const TOPICS = [
  { value: "order", label: "Mere order ke baare mein" },
  { value: "replacement", label: "Replacement / refund" },
  { value: "bulk", label: "Bulk ya gifting order" },
  { value: "product", label: "Product ke baare mein sawaal" },
  { value: "other", label: "Kuch aur" },
] as const;
