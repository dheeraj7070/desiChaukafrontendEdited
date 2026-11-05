import type { LegalDoc } from "@/types/Legal";

export const refundPolicy: LegalDoc = {
  href: "/refund-policy",
  title: "Replacement & Refund Policy",
  description:
    "When and how you can request a replacement or refund for an order from Deshi Chauka.",
  intro: [
    "At Deshi Chauka, we want every order to reach you in good condition and give you a great shopping experience. If you receive a damaged, defective, incorrect, or missing product, you may request a refund or replacement under the conditions mentioned below.",
  ],
  sections: [
    {
      title: "1. Eligibility for Replacement",
      blocks: [
        {
          type: "p",
          text: "A customer may request a replacement in the following situations:",
        },
        {
          type: "ul",
          items: [
            "The product received is damaged.",
            "The product is defective or not functioning properly.",
            "The wrong product has been delivered.",
            "The product received is incomplete or has missing parts.",
            "The product does not match the order details.",
          ],
        },
      ],
    },
    {
      title: "2. Replacement Verification Process",
      blocks: [
        {
          type: "p",
          text: "All replacement requests are subject to verification by our team.",
        },
        {
          type: "ul",
          items: [
            "Customers must submit a replacement request within 48 hours of receiving the product.",
            "Customers may be required to provide clear photos or videos of the product and its packaging.",
            "Our team will review the submitted request and verify the issue.",
            "Replacement will only be approved after successful verification.",
            "If the request is approved, we will initiate the replacement process.",
            "If the request does not meet our replacement conditions, it may be rejected.",
          ],
        },
        {
          type: "note",
          text: "Important: Submitting a replacement request does not guarantee approval. Replacement will be provided only after verification and approval by Deshi Chauka.",
        },
      ],
    },
    {
      title: "3. Replacement Conditions",
      blocks: [
        {
          type: "ul",
          items: [
            "The product must be unused, wherever applicable.",
            "Original packaging, tags, accessories, and invoices should be retained.",
            "The issue must be reported within the specified time.",
            "Products damaged due to customer misuse or improper handling may not qualify for replacement.",
          ],
        },
      ],
    },
    {
      title: "4. Refund Policy",
      blocks: [
        { type: "p", text: "Refunds may be provided in the following situations:" },
        {
          type: "ul",
          items: [
            "If an eligible order is cancelled before dispatch.",
            "If a product is unavailable after order confirmation and payment.",
            "If a verified damaged, defective, or incorrect product cannot be replaced.",
            "If Deshi Chauka approves a refund after reviewing the complaint.",
            "If an order is successfully cancelled under our applicable cancellation terms.",
          ],
        },
      ],
    },
    {
      title: "5. Refund Processing",
      blocks: [
        {
          type: "ul",
          items: [
            "Refund requests will be reviewed and verified by our team.",
            "Approved refunds will be initiated through the original payment method, wherever possible.",
            "Refund processing generally takes 5–7 business days after approval, depending on the payment provider or bank.",
            "For Cash on Delivery (COD) orders, customers may be asked to provide valid bank account details or another supported refund method.",
          ],
        },
      ],
    },
  ],
};
