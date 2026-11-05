'use client'
import { loginWithOtp } from "@/app/api/auth/login";
import { useEffect, useState, useTransition } from "react";

const RESEND_SECONDS = 30;
export function ResendOtp({email} : {email:string}) {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
const [isResend, handleResend ]= useTransition();
  useEffect(() => {
    if (secondsLeft <= 0) return
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft])

  function resend () {
    const formT = new FormData();
    formT.append('email', email);
    handleResend( async () => {
      const res = await loginWithOtp({}, formT);
      if(res?.error)  {
        console.log(res.error);
        return;
      }
      setSecondsLeft(RESEND_SECONDS);
    })
  }
  return (
    <p className="mt-6 text-center text-sm text-muted-foreground">
      Didn&apos;t get the code?{" "}
      {secondsLeft > 0 ? (
        <span>Resend in {secondsLeft}s</span>
      ) : (
        <button
          type="button"
          onClick={resend}
          disabled={isResend}
          className="font-semibold text-primary hover:underline"
        >
          {isResend ?" Resending code..." : "Resend code"}
        </button>
      )}
    </p>
  );
}
