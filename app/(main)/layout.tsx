import "@/app/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "./home/header/header";
import Offers from "./home/offers/offers";
import Footer from "./home/footer/footer";
import { Toaster } from "@/components/ui/sonner";
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
// import Logo from "@/lib/assets/logo.webp"
import { CartProvider } from "@/components/cart/CartProvider";

// export const metadata: Metadata = {
//   icons:[],
//   title: "Desi Chauka",
//   description: "माटी की खुशबू,परंपरा का स्वाद",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" className={cn("font-sans", geist.variable)}>
//       <head>
//         <title>Desi Chauka</title>
//       </head>
//       <body>
//         <Offers />
//         <Header />

//         <main className="mx-auto w-full max-w-7xl px-4 pb-16 lg:px-8">
//           {children}
//         </main>
//         <Footer />
//         <Toaster />
//       </body>
//     </html>
//   );
// }



export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <CartProvider>
      <Offers />
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 lg:px-8">
        {children}
      </main>
      <Footer />
      <Toaster />
    </CartProvider>
  );
}
