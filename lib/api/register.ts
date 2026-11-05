import "server-only";
import { publicRequestEnvelope } from "@/lib/envelope";
import type { RegisteredUser } from "@/types/Register";
import type { RegisterInput } from "@/lib/validation/register";

// Backend sends the OTP email itself after a successful registration.
export function registerUser(input: RegisterInput) {
  return publicRequestEnvelope<RegisteredUser>("/email-registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}
