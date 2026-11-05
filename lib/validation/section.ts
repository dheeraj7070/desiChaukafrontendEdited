import { z } from "zod";
import { SECTION_TYPE, SECTION_STATUS } from "@/types/section";


export const SectionSchema = z.object({
  id: z.guid(),
  title: z
    .string()
    .min(1, "Title must be at least 1 character long.")
    .max(60, "Title can be at most 60 characters long."),
  type: z.enum(SECTION_TYPE, "Select a valid type."),
  position: z.number("Position is required.").int().nonnegative("Position cannot be negative."),
  tagId: z.guid().nullable(),
  categoryId: z.guid().nullable(),
  itemLimit: z.number("Item limit is required.").int().min(1).max(60),
  status: z.enum(SECTION_STATUS, "Select a valid status."),
});

export const CreateSectionSchema = SectionSchema.omit({ id: true }).superRefine(
  (data, ctx) => {
    if (data.type === "tag" && !data.tagId) {
      ctx.addIssue({ code: "custom", path: ["tagId"], message: "Select a tag." });
    }
    if (data.type === "category" && !data.categoryId) {
      ctx.addIssue({ code: "custom", path: ["categoryId"], message: "Select a category." });
    }
  }
);
