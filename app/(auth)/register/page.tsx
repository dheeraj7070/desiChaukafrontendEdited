import Link from "next/link";
import { RegisterForm } from "./component/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-dvh w-md items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <div className=" w-full overflow-hidden rounded-3xl border bg-card shadow-xl md:grid-cols-[1.05fr_1fr]">
        <section className="flex items-center p-6 sm:p-10">
          <div className="mx-auto w-full max-w-sm">
            <Header />
            <RegisterForm />
            <Footer />
          </div>
        </section>
      </div>
    </main>
  );
}

function Header() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight font-sans">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Join Deshi Chauka in a few seconds
      </p>
    </>
  );
}

function Footer() {
  return (
    <div className=" w-full ">
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-6 border-t pt-4 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-foreground">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
