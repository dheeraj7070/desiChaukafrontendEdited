import { getCookie } from "@/lib/session";
import { ArrowLeft, MailCheck } from "lucide-react";
import { redirect } from "vinext/shims/navigation-errors";
import { OtpForm } from "../component/otpForm";
import { ResendOtp } from "../component/resendOtp";
import Link from "next/link";

const OTP_LENGTH = 6;

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!domain) return email;
  return `${name.slice(0, 2)}${"*".repeat(Math.max(name.length - 2, 1))}@${domain}`;
}

export default async function Verify() {
   
  let raw = (await getCookie("verify_otp"))?.value;
  //(raw);
  if (!raw) redirect("/login");
  const { email } = JSON.parse(raw);
  function onBack() {}
  return (
    <div>
      <Link href={"/login"}
        type="button"
        // onClick={onBack}
        className="-ml-1 flex items-center gap-1 rounded-md p-1 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <ArrowLeft className="size-4" />
        Change email
      </Link>

      <div className="mt-4 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="size-6" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Check your email
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We sent a {OTP_LENGTH}-digit code to{" "}
          <span className="font-medium text-foreground">
            {maskEmail(email)}
          </span>
        </p>
      </div>
      <OtpForm maxLength={6} email={email} />
      <ResendOtp email={email} />
    </div>
  );
}
