import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import { MediaAlign } from "./media-align";

export function getExtensions() {
  return [
    StarterKit.configure({
      heading: { levels: [2, 3] },
      link: {
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      },
    }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Image.configure({
      HTMLAttributes: { class: "max-w-full h-auto rounded-lg" },
    }),
    Youtube.configure({
      nocookie: true,
      controls: true,
      allowFullscreen: true,
      width: 560,
      HTMLAttributes: { class: "block aspect-video h-auto max-w-full rounded-lg" },
    }),
    MediaAlign,
  ];
}