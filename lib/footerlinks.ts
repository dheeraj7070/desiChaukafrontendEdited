// lib/footerLinks.ts
//
// Footer me jo bhi dikhta hai wo SIRF isi file se aata hai.
// Link add/hatana ho, naam badalna ho, naya group chahiye -> yahin badlo,
// Footer.tsx ko chhune ki zarurat nahi.

export type FooterLink = {
  id: string;
  text: string;
  location: string; // "/path" (internal) ya "https://..." / "tel:" / "mailto:" (external)
};

export type FooterGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};

/* ---------- Brand ---------- */
export const FOOTER_BRAND = {
  name: "DESI CHAUKA",
  tagline: "बिहार का स्वाद • घर का प्यार",
  about:
    "Bihar ke traditional achaar, thekua aur mithai, ghar jaisi recipe se bani aur seedha aapke ghar tak.",
};

/* ---------- Link groups (kitne bhi group/links rakh sakte ho) ---------- */
export const FOOTER_GROUPS: FooterGroup[] = [
  {
    id: "shop",
    title: "Shop",
    links: [
      { id: "home", text: "Home", location: "/" },
      { id: "all-products", text: "All products", location: "/products" },
      { id: "cart", text: "Cart", location: "/cart" },
      { id: "account", text: "My account", location: "/profile" },
    ],
  },
  {
    id: "help",
    title: "Help",
    links: [
      { id: "my-orders", text: "My orders", location: "/orders" },
      { id: "contact", text: "Contact us", location: "/contact" },
      { id: "faq", text: "FAQs", location: "/faq" },
    ],
  },
  {
    id: "policies",
    title: "Policies",
    links: [
      { id: "about", text: "About us", location: "/about" },
      { id: "terms", text: "Terms & conditions", location: "/terms" },
      { id: "privacy", text: "Privacy policy", location: "/privacy" },
      { id: "refund", text: "Replacement & refund", location: "/refund-policy" },
    ],
  },
];

/* ---------- Social: location khali ("") chhodo to wo link chhup jayega ---------- */
export const FOOTER_SOCIAL: FooterLink[] = [
  { id: "instagram", text: "Instagram", location: "https://instagram.com/your-handle" },
  { id: "facebook", text: "Facebook", location: "https://facebook.com/your-page" },
  { id: "youtube", text: "YouTube", location: "" },
];

/* ---------- Contact: khali string = wo line dikhegi hi nahi ---------- */
// TODO: apni asli details daalo
export const FOOTER_CONTACT = {
  phone: "+91 90000 00000",
  whatsapp: "919000000000", // country code ke saath, bina + ya space ke
  email: "hello@example.com",
  address: "Bihar, India",
};

/* ---------- Legal: khali ho to dikhega nahi ---------- */
// Khane ka saaman online bechne par FSSAI license number website par dikhana zaruri hai.
export const FOOTER_LEGAL = {
  fssai: "", // e.g. "10020000000000"
  gstin: "",
};