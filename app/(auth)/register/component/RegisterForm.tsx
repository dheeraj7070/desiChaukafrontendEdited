"use client";

import { useActionState } from "react";
import { Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "@/app/api/auth/register";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} role="alert" className="text-xs text-destructive">
      {errors[0]}
    </p>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, undefined);
  const values = state?.values;
  const errors = state?.fieldErrors;

  return (
    <form action={action} className="mt-6 space-y-4">
      {state?.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            required
            maxLength={50}
            autoComplete="given-name"
            placeholder="First name"
            defaultValue={values?.firstName ?? ""}
            aria-invalid={!!errors?.firstName}
            aria-describedby={errors?.firstName ? "firstName-error" : undefined}
            className="h-11"
          />
          <FieldError id="firstName-error" errors={errors?.firstName} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            required
            maxLength={50}
            autoComplete="family-name"
            placeholder="Last name"
            defaultValue={values?.lastName ?? ""}
            aria-invalid={!!errors?.lastName}
            aria-describedby={errors?.lastName ? "lastName-error" : undefined}
            className="h-11"
          />
          <FieldError id="lastName-error" errors={errors?.lastName} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            defaultValue={values?.email ?? ""}
            aria-invalid={!!errors?.email}
            aria-describedby={errors?.email ? "email-error" : undefined}
            className="pl-8 h-11"
          />
        </div>
        <FieldError id="email-error" errors={errors?.email} />
      </div>

      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        We&apos;ll email you a one-time code to verify your account.
      </p>

      <Button
        disabled={pending}
        type="submit"
        size="lg"
        className="h-11 w-full"
      >
        {pending ? "Please wait..." : "Create account"}
      </Button>
    </form>
  );
}
