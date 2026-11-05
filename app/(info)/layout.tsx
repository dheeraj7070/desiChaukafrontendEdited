import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "@/app/globals.css";
// NOTE: no <html>/<body> here. If your storefront pages live in a group that
// already has a header/footer layout, move the whole `(info)` folder inside it.
export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="mb-8 -ml-1 inline-flex items-center gap-1 rounded-md p-1 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>
      {children}
    </main>
  );
}
