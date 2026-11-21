"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { setCookie } from "@/lib/session";
import { registerUser } from "@/lib/api/register";
import { registerSchema } from "@/lib/validation/register";
import type { RegisterState, RegisterValues } from "@/types/Register";

// same cookie the login flow uses, so /login/verify can read the email
const otpKey = process.env.OTP_KEY ?? "verify_otp";

export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const values: RegisterValues = {
    email: String(formData.get("email") ?? ""),
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
  };

  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const result = await registerUser(parsed.data);
  console.log(result);
  if (!result.ok) {
    return { error: result.message, values };
  }

  try {
    await setCookie(otpKey, JSON.stringify({ email: parsed.data.email }));
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again.", values };
  }

  // keep redirect outside try/catch (it works by throwing)
  redirect("/login/verify");
}
