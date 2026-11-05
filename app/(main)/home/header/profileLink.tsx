import { cookies } from "next/headers";
import { cn } from "cn";
import { LogIn, User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const base =
  "relative flex h-10 w-10 items-center justify-center gap-2 rounded-full border px-0 text-sm font-medium transition-[background-color,transform] active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:h-11 lg:w-auto lg:px-4";

async function Profile() {
  const cookieStore = await cookies();
  const hasSession =
    cookieStore.has("__Host-customer_access") ||
    cookieStore.has("__Host-customer_refresh");
  return (
    <>
      {hasSession ? (
        <Link
          href="/profile"
          prefetch={false}
          aria-label="Account"
          className={cn(
            base,
            "hidden sm:flex border-border bg-card hover:bg-muted",
          )}
        >
          <User className="size-5" />
          <span className="hidden lg:inline">Account</span>
        </Link>
      ) : (
        <LoginLink />
      )}
    </>
  );
}

export function ProfileLink() {
  return (
    <Suspense fallback={<LoginLink />}>
      <Profile />
    </Suspense>
  );
}

function LoginLink() {
  return (
    <Link
      href="/login"
      aria-label="Login"
      className={cn(
        base,
        "hidden sm:flex border-border bg-card hover:bg-muted",
      )}
    >
      <LogIn className="size-5" />
      <span className="hidden lg:inline">Login</span>
    </Link>
  );
}
