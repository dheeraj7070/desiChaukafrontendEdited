"use client";
import { cn } from "@/lib/utils";
import { KeyRound, Lock, LucideIcon } from "lucide-react";
import { useState } from "react";
import { LoginWithOtp } from "./component/LoginWithOtp";
import { LoginWithPassword } from "./component/loginWithPassword";
import Link from "next/link";


type Mode = "otp" | "password";

const modes = [
  { value: "otp", label: "OTP", Icon: KeyRound },
  // { value: "password", label: "Password", Icon: Lock },
] as const;

export default function LoginManager() {
  const [mode, setMode] = useState<Mode>("otp");
  return (
    <main className="flex min-h-dvh w-md items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <div className=" w-full overflow-hidden rounded-3xl border bg-card shadow-xl md:grid-cols-[1.05fr_1fr]">
        <section className="flex items-center p-6 sm:p-10">
          <div className="mx-auto w-full max-w-sm">
            <Header />
            {/* <div
              role="group"
              aria-label="Login method"
              className="mt-6 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1"
            >
              {modes.map(({ value, label, Icon }) => (
                <ModeRender
                  key={`value:${value}`}
                  mode={mode}
                  value={value}
                  label={label}
                  Icon={Icon}
                  onClick={() => setMode(value)}
                />
              ))}
            </div> */}
            {mode == "otp" ? <LoginWithOtp /> : <LoginWithPassword />}
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
      <h1 className="text-2xl font-bold tracking-tight font-sans">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sign in to your Deshi Chauka account
      </p>
    </>
  );
}

function Footer() {
  return (
    <div className=" w-full ">
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to Deshi Chauka?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Create an account
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

function ModeRender({
  mode,
  value,
  label,
  Icon,
  onClick,
}: {
  mode: string;
  value: string;
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
}) {
  return (
    <button
      key={value}
      type="button"
      // aria-pressed={mode === value}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        mode === value
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}
