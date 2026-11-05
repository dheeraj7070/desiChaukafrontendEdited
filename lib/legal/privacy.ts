import type { LegalDoc } from "@/types/Legal";
import { CONTACT } from "./site";

export const privacyPolicy: LegalDoc = {
  href: "/privacy",
  title: "Privacy Policy",
  description:
    "How Deshi Chauka collects, uses, stores, and protects your personal information.",
  effectiveDate: "03 November 2026",
  intro: [
    "Welcome to Deshi Chauka. Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit or make a purchase through our website or web application.",
  ],
  sections: [
    {
      title: "1. Information We Collect",
      blocks: [
        {
          type: "p",
          text: "When you use Deshi Chauka, we may collect the following information:",
        },
        {
          type: "ul",
          items: [
            {
              label: "Personal Information:",
              text: "Name, email address, phone number, and delivery address.",
            },
            {
              label: "Account Information:",
              text: "Login credentials and account details.",
            },
            {
              label: "Order Information:",
              text: "Products purchased, order history, and transaction details.",
            },
            {
              label: "Payment Information:",
              text: "Payment status and transaction references. Payments may be processed through secure third-party payment gateways.",
            },
            {
              label: "Technical Information:",
              text: "IP address, browser type, device information, and website usage data.",
            },
          ],
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      blocks: [
        { type: "p", text: "We use your information to:" },
        {
          type: "ul",
          items: [
            "Process and deliver your orders.",
            "Manage your account and provide customer support.",
            "Send order confirmations and delivery updates.",
            "Improve our products, services, and website experience.",
            "Prevent fraudulent transactions and unauthorized activities.",
            "Send promotional offers and updates, where permitted.",
          ],
        },
      ],
    },
    {
      title: "3. Payment Security",
      blocks: [
        {
          type: "p",
          text: "Deshi Chauka uses third-party payment service providers to process online payments. We do not intend to store your complete debit card, credit card, or UPI PIN details on our servers.",
        },
        {
          type: "p",
          text: "All payment transactions are subject to the security and privacy policies of the respective payment providers.",
        },
      ],
    },
    {
      title: "4. Sharing of Information",
      blocks: [
        {
          type: "p",
          text: "We do not sell or rent your personal information to third parties.",
        },
        { type: "p", text: "We may share necessary information with:" },
        {
          type: "ul",
          items: [
            "Delivery and logistics partners.",
            "Payment gateway providers.",
            "Technology and hosting service providers.",
            "Government authorities when legally required.",
          ],
        },
      ],
    },
    {
      title: "5. Cookies",
      blocks: [
        {
          type: "p",
          text: "Our website may use cookies and similar technologies to improve your browsing experience, remember preferences, and understand website traffic.",
        },
        {
          type: "p",
          text: "You can manage or disable cookies through your browser settings.",
        },
      ],
    },
    {
      title: "6. Data Security",
      blocks: [
        {
          type: "p",
          text: "We take reasonable technical and organizational measures to protect your personal information against unauthorized access, misuse, alteration, or disclosure.",
        },
        {
          type: "p",
          text: "However, no online platform can guarantee 100% security.",
        },
      ],
    },
    {
      title: "7. Your Privacy Rights",
      blocks: [
        { type: "p", text: "You may request to:" },
        {
          type: "ul",
          items: [
            "Access your personal information.",
            "Correct inaccurate information.",
            "Update your account details.",
            "Request deletion of your personal information, subject to applicable legal requirements.",
            "Withdraw consent where applicable.",
          ],
        },
      ],
    },
    {
      title: "8. Third-Party Links",
      blocks: [
        {
          type: "p",
          text: "Our website may contain links to third-party websites or services. Deshi Chauka is not responsible for the privacy practices of those external websites.",
        },
      ],
    },
    {
      title: "9. Children's Privacy",
      blocks: [
        {
          type: "p",
          text: "Our services are not intentionally directed toward children under 18 without parental or guardian involvement. We do not knowingly collect personal information from children in violation of applicable laws.",
        },
      ],
    },
    {
      title: "10. Changes to This Policy",
      blocks: [
        {
          type: "p",
          text: "We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated effective date.",
        },
      ],
    },
    {
      title: "11. Contact Us",
      blocks: [
        {
          type: "p",
          text: "If you have questions about this Privacy Policy or how your information is handled, please contact us:",
        },
        {
          type: "ul",
          items: [
            { label: "Brand:", text: "Deshi Chauka" },
            { label: "Email:", text: CONTACT.email },
            { label: "Phone:", text: CONTACT.phone },
            { label: "Address:", text: CONTACT.address },
          ],
        },
      ],
    },
  ],
  closing: "Thank you for trusting Deshi Chauka.",
};
