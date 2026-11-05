import type { LegalDoc } from "@/types/Legal";

export const terms: LegalDoc = {
  href: "/terms",
  title: "Terms & Conditions",
  description:
    "Terms of use, ordering and payment policy for Deshi Chauka customers and home chefs.",
  sections: [
    {
      title: "1. About Deshi Chauka",
      blocks: [
        {
          type: "p",
          text: "Deshi Chauka is a food e-commerce platform that connects customers with Indian women who prepare homemade food using traditional recipes and their cooking skills.",
        },
        {
          type: "p",
          text: "Our mission is to promote authentic homemade Indian food and empower women entrepreneurs by providing them with an online platform to showcase and sell their food products.",
        },
        {
          type: "p",
          text: "By accessing or using the Deshi Chauka application, customers, home chefs, and other users agree to these Terms & Conditions.",
        },
      ],
    },
    {
      title: "2. Homemade Food and Home Chefs",
      blocks: [
        {
          type: "ul",
          items: [
            "Food items listed on Deshi Chauka are prepared by participating women home chefs, as described in each listing.",
            "Home chefs must provide accurate information about food items, ingredients, prices, quantities, and preparation methods.",
            "Home chefs must comply with applicable food safety, hygiene, registration, and licensing requirements.",
            "Customers should review item descriptions and available allergen information before placing an order.",
            "Homemade food may vary slightly in taste, appearance, and presentation because it is prepared in small batches.",
            "Deshi Chauka may verify seller information and relevant food business documents.",
          ],
        },
      ],
    },
    {
      title: "3. Food Quality and Hygiene",
      blocks: [
        {
          type: "ul",
          items: [
            "Home chefs are responsible for maintaining appropriate cleanliness, food handling, storage, and preparation standards.",
            "Food must be prepared and handled in accordance with applicable food safety requirements.",
            "Customers should report suspected spoilage, incorrect items, missing items, or other food quality concerns promptly after delivery.",
            "Food safety complaints will be reviewed and addressed appropriately.",
            "Nothing in this policy limits customers' statutory rights concerning unsafe or defective food.",
          ],
        },
      ],
    },
    {
      title: "4. Order Placement and Confirmation",
      blocks: [
        {
          type: "ul",
          items: [
            "Customers must provide accurate contact information and delivery addresses.",
            "Orders are subject to item availability and acceptance by the relevant home chef.",
            "Food preparation may begin after order confirmation.",
            "Estimated delivery times are indicative and may vary due to preparation time, traffic, weather, and other circumstances.",
            "The final payable amount will be displayed before order confirmation.",
          ],
        },
      ],
    },
    {
      title: "5. Payment Policy",
      blocks: [
        {
          type: "p",
          text: "Deshi Chauka may support the following payment methods, depending on availability:",
        },
        {
          type: "ul",
          items: [
            "UPI",
            "Debit and credit cards",
            "Net banking",
            "Supported digital wallets",
            "Cash on Delivery (COD), where available",
          ],
        },
        { type: "p", text: "Payment conditions:" },
        {
          type: "ol",
          items: [
            "All prices and charges will be displayed in Indian Rupees (INR).",
            "Applicable delivery charges, packaging fees, platform fees, and taxes will be disclosed before order confirmation.",
            "Orders requiring advance payment will be processed according to payment confirmation and order acceptance procedures.",
            "Customers must pay the displayed amount using an authorized payment method.",
            "COD orders must be paid for at the time of delivery.",
            "If payment is deducted but an order is not confirmed, customers may contact support with their transaction reference.",
            "Eligible refunds will be initiated according to this policy and applicable payment processing requirements.",
            "Customers must never disclose their UPI PIN, card PIN, OTP, or other confidential payment credentials to anyone.",
          ],
        },
      ],
    },
  ],
};
