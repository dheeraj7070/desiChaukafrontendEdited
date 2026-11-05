"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, MailCheck } from "lucide-react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

// ab***@gmail.com
function maskEmail(email: string) {
  const [name, domain] = email.split("@")
  if (!domain) return email
  return `${name.slice(0, 2)}${"*".repeat(Math.max(name.length - 2, 1))}@${domain}`
}

type Props = { email: string; onBack: () => void }

export function OtpVerify({ email, onBack }: Props) {
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)

  // Resend ka countdown
  useEffect(() => {
    if (secondsLeft <= 0) return
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft])

  async function verify(value: string = code) {
    if (value.length !== OTP_LENGTH || pending) return
    setPending(true)
    setError(null)
    try {
      // TODO: Server Action call karo, jaise:
      // await verifyOtp({ email, code: value })
      // (wo backend se verify karega, cookies set karega, phir redirect("/"))
      //("verify", email, value)
    } catch {
      setError("Code galat ya expire ho gaya hai. Dobara try karein.")
      setCode("")
    } finally {
      setPending(false)
    }
  }

  async function resend() {
    setSecondsLeft(RESEND_SECONDS)
    setCode("")
    setError(null)
    // TODO: await sendOtp(email)
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="-ml-1 flex items-center gap-1 rounded-md p-1 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <ArrowLeft className="size-4" />
        Change email
      </button>

      <div className="mt-4 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="size-6" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Check your email</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We sent a {OTP_LENGTH}-digit code to{" "}
          <span className="font-medium text-foreground">{maskEmail(email)}</span>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          verify()
        }}
        className="mt-6 space-y-4"
      >
        <InputOTP
          maxLength={OTP_LENGTH}
          value={code}
          onChange={(v) => {
            setCode(v)
            if (error) setError(null)
          }}
          onComplete={verify}                 // 6 digit poore hote hi auto-submit
          pattern={REGEXP_ONLY_DIGITS}        // sirf numbers
          inputMode="numeric"
          autoComplete="one-time-code"        // mobile par SMS/email se autofill
          autoFocus
          disabled={pending}
          aria-label="One-time code"
          aria-invalid={!!error}
          containerClassName="w-full justify-center"
        >
          <InputOTPGroup className="w-full">
            {Array.from({ length: OTP_LENGTH }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="h-11 flex-1 text-lg sm:h-12"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {error && (
          <p role="alert" className="text-center text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="h-11 w-full"
          disabled={pending || code.length !== OTP_LENGTH}
        >
          {pending ? "Verifying..." : "Verify & Login"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Didn&apos;t get the code?{" "}
        {secondsLeft > 0 ? (
          <span>Resend in {secondsLeft}s</span>
        ) : (
          <button
            type="button"
            onClick={resend}
            className="font-semibold text-primary hover:underline"
          >
            Resend code
          </button>
        )}
      </p>
    </div>
  )
}