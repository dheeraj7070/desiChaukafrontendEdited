"use server";

import { loginWithOtpSchema, verifyOtpSchema } from "./schema";
import { redirect } from "next/navigation";

import { AppError } from "@/lib/AppError";
import { setCookie, parseAndSetCookie } from "@/lib/session";

import z from "zod";
import { fetchApi } from "@/lib/fetchApi";
import { publicApi } from "@/lib/publicApi";
import { deleteCookie, setCookiesFromResponse } from "@/lib/cookies";

const otpKey = process.env.OTP_KEY ?? "verify_otp";

type State =
  | {
      error?: string;
    }
  | undefined;
export async function loginWithOtp(
  _prev: State,
  loginData: FormData,
): Promise<State> {
  const parsed = loginWithOtpSchema.safeParse(
    Object.fromEntries(loginData.entries()),
  );

  if (!parsed.success) {
    // //(parsed.error);
    return { error: parsed.error.message };
  }

  try {
    const response = await publicApi("/login-with-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    //  console.log(error);
  } catch (error) {
      console.log(error);
    if (error instanceof AppError) {
      return { error: error.message };
    }
  }
  
  try {
    await setCookie(otpKey, JSON.stringify({ email: parsed.data.email }));
  } catch (error) {
      console.log(error);
  }
  redirect("/login/verify");
}

export async function verifyOtp(
  _prev: State,
  otpData: FormData,
): Promise<State> {
  const parsed = verifyOtpSchema.safeParse(
    Object.fromEntries(otpData.entries()),
  );
  if (!parsed.success) return { error: z.prettifyError(parsed.error) };
  let res: Response;
  try {
    res = await publicApi("/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
  } catch (e) {
    if (e instanceof AppError) return { error: e.message };
    throw e; // koi aur ajeeb error ho to chhupao mat
  }
  await deleteCookie(otpKey);
  await setCookiesFromResponse(res); // ← yahi missing tha

  redirect("/products"); // try/catch ke bahar hi rakhna
}

export async function refreshSession() {
  const res = await fetchApi("/refresh_access_token");
}
