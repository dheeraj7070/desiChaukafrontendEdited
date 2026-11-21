"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TOPICS, whatsappLink } from "@/lib/contact";
import { sendContactMessage, type ContactState } from "@/app/(main)/contact/actions";

const initial: ContactState = { status: "idle" };

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {hint && <span className="ml-1 font-normal text-muted-foreground">({hint})</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initial);
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-6" role="status">
        <CheckCircle2 className="size-10 text-primary" />
        <h2 className="text-2xl font-semibold">Message mil gaya, shukriya!</h2>
        <p className="text-muted-foreground">
          Hum 24 ghante ke andar aapko phone ya email par jawab denge. Jaldi chahiye to
          seedha WhatsApp kar dijiye.
        </p>
        <Button asChild variant="outline">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp par baat karein
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5">
      {state.message && (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {state.message}
        </p>
      )}

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Aapka naam" error={e.name}>
          <Input id="name" name="name" autoComplete="name" defaultValue={v.name} aria-invalid={!!e.name} aria-describedby={e.name ? "name-error" : undefined} />
        </Field>
        <Field id="phone" label="Mobile number" error={e.phone}>
          <Input id="phone" name="phone" type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national" placeholder="9876543210" defaultValue={v.phone} aria-invalid={!!e.phone} aria-describedby={e.phone ? "phone-error" : undefined} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" hint="zaroori nahi" error={e.email}>
          <Input id="email" name="email" type="email" autoComplete="email" defaultValue={v.email} aria-invalid={!!e.email} aria-describedby={e.email ? "email-error" : undefined} />
        </Field>
        <Field id="topic" label="Kis baare mein?" error={e.topic}>
          <select
            id="topic"
            name="topic"
            defaultValue={v.topic ?? ""}
            aria-invalid={!!e.topic}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
          >
            <option value="" disabled>Chuniye…</option>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="orderId" label="Order number" hint="agar order se juda hai">
        <Input id="orderId" name="orderId" defaultValue={v.orderId} />
      </Field>

      <Field id="message" label="Aapka message" error={e.message}>
        <Textarea id="message" name="message" rows={5} defaultValue={v.message} aria-invalid={!!e.message} aria-describedby={e.message ? "message-error" : undefined} />
      </Field>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending && <Loader2 className="animate-spin" />}
        {pending ? "Bhej rahe hain…" : "Message bhejein"}
      </Button>
    </form>
  );
}
