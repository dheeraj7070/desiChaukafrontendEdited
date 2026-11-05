"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { requestEnvelope } from "@/lib/envelope"

// NOTE: Agar tumhara fetchApi backend ki Set-Cookie header browser tak forward nahi karta,
// to yahan apne auth cookies ke asli naam daalo. Jo cookie hai hi nahi, uska delete harmless hai.
const AUTH_COOKIES = ["access_token", "refresh_token"]

/** POST /logout (body nahi). Backend fail ho tab bhi local cookies saaf karke bahar nikaal dete hain. */
export async function logoutAction() {
  await requestEnvelope<unknown>("/logout", { method: "POST" })

  const store = await cookies()
  for (const name of AUTH_COOKIES) store.delete(name)

  revalidatePath("/", "layout")
  redirect("/")
}
