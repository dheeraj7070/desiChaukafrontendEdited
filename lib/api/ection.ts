// app/(admin)/sections/actions.ts   (adjust the path to your route)
"use server";

import { revalidatePath } from "next/cache";
import { requestEnvelope } from "@/lib/envelope";
import type { CreateSection as SectionFormValues } from "@/types/section";

export async function createSection(values: SectionFormValues) {

  const res = await requestEnvelope("/admin/home-sections", {
    method: "POST",
    body: JSON.stringify(values),
  });

  console.log(values);
  console.log(res);
  if (res.ok) revalidatePath("/sections"); // <- your sections route
  return res;
}

export async function updateSection(id: string, values: SectionFormValues) {
  const res = await requestEnvelope<unknown>(`/admin/home-sections/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
  if (res.ok) revalidatePath("/sections"); // <- your sections route
  return res;
}
