"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useActionState, useState } from "react";
import {verifyOtp} from '@/app/api/auth/login'
export function OtpForm({
  maxLength,
  email,
}: {
  maxLength: number;
  email: string;
}) {
  const [state, action, pending] = useActionState(verifyOtp, undefined);
  const [otp, setOtp] = useState("");
  return (
    <form action={action} className="mt-6 space-y-4">
      {state && <p>{state?.error}</p>}
      <Input value={email} name="email" hidden />
      <InputOTP
        maxLength={maxLength}
        value={otp}
        name="otp"
        // 6 digit poore hote hi auto-submit
        pattern={REGEXP_ONLY_DIGITS} // sirf numbers
        inputMode="numeric"
        autoComplete="one-time-code" // mobile par SMS/email se autofill
        autoFocus
        onChange={(e) => setOtp(e)}
        //   disabled={pending}
        aria-label="One-time code"
        //   aria-invalid={!!error}
        containerClassName="w-full justify-center"
      >
        <InputOTPGroup className="w-full">
          {Array.from({ length: maxLength }).map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="h-11 flex-1 text-lg sm:h-12"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {/* {error && (
          <p role="alert" className="text-center text-sm text-destructive">
            {error}
          </p>
        )} */}

      <Button
        type="submit"
        size="lg"
        className="h-11 w-full"
          disabled={pending || otp.length !== maxLength}
      >
        {pending ? "Verifying..." : "Verify & Login"}
      </Button>
    </form>
  );
}
