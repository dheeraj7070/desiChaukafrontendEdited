"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requestEnvelope } from "@/lib/envelope";
import { deleteAllCookies } from "@/lib/cookies";

/** POST /logout (body nahi). Backend fail ho tab bhi local cookies saaf karke bahar nikaal dete hain. */
export async function logoutAction() {
  await requestEnvelope<unknown>("/logout", { method: "POST" });
  await deleteAllCookies();
  revalidatePath("/", "layout");
  redirect("/");
}
