import { Extension } from "@tiptap/core";

export const MediaAlign = Extension.create({
  name: "mediaAlign",
  addGlobalAttributes() {
    return [
      {
        types: ["image", "youtube"],
        attributes: {
          align: {
            default: "center",
            parseHTML: (el: HTMLElement) => el.getAttribute("data-align") || "center",
            renderHTML: (attrs: Record<string, any>) => ({
              "data-align": attrs.align,
            }),
          },
        },
      },
    ];
  },
});