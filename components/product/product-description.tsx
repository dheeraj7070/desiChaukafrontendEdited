import { renderDescriptionHtml } from "@/lib/editor/render";

export function ProductDescription({ value }: { value?: unknown }) {
  const html = renderDescriptionHtml(value);
  if (!html) return null;

  return (
    <div
      className="prose max-w-none prose-li:my-1 [&_li>p]:my-0"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}