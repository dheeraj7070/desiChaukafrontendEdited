import { z } from "zod";
import { TOPICS } from "@/lib/contact";

const topicValues = TOPICS.map((t) => t.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Apna naam likhiye").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "10 digit ka valid mobile number daaliye"),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((v) => v === "" || /^\S+@\S+\.\S+$/.test(v), "Valid email daaliye"),
  topic: z.enum(topicValues, { message: "Topic chuniye" }),
  orderId: z.string().trim().max(40),
  message: z
    .string()
    .trim()
    .min(10, "Thoda aur detail likhiye (kam se kam 10 akshar)")
    .max(1000, "Message 1000 akshar se chhota rakhiye"),
});

export type ContactInput = z.infer<typeof contactSchema>;
