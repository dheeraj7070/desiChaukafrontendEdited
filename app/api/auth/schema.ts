import z, { maxLength, minLength } from "zod";

const email = z.string().email('Invalid email');

export const loginWithOtpSchema = z.object({
    email: email
});

export const verifyOtpSchema = z.object({
    email,
    otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
})

export const loginWithPasswordSchema = z.object({
    email:email,
    password: z.string().min(8, "At least 8 characters"),
})