import { renderToHTMLString } from "@tiptap/static-renderer";
import { getExtensions } from "./extensions";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderDescriptionHtml(raw: unknown): string {
  if (!raw) return "";

  // String ho toh JSON parse try karo
  let doc: unknown = raw;
  if (typeof raw === "string") {
    try {
      doc = JSON.parse(raw);
    } catch {
      // Purani plain text description
      return raw
        .split(/\n{2,}/)
        .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br />")}</p>`)
        .join("");
    }
  }

  if (!doc || typeof doc !== "object" || (doc as { type?: string }).type !== "doc") {
     console.error("[renderDescriptionHtml] doc type galat:", doc);
    return "";
  }

  try {
    const html =  renderToHTMLString({
      extensions: getExtensions(),
      content: doc as any,
    });
    console.log("[renderDescriptionHtml] html:", html);
    return html;
  } catch (err) {
    console.error("[renderDescriptionHtml] render fail:", err);
    return "";
  }
}