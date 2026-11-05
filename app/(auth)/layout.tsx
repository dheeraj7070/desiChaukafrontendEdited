import "@/app/globals.css"
export default function Layoug({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="flex justify-center items-center w-full min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
