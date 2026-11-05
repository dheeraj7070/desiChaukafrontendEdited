import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useActionState } from "react";
import { loginWithOtp } from "@/app/api/auth/login";
export function LoginWithOtp() {
  const [state, action, pending] = useActionState(loginWithOtp, undefined);
  return (
    <form action={action} className="mt-6 space-y-4">
      {state && <p className="text-red-500 ">{state.error}</p>}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            defaultValue={""}
            className="pl-8 h-11"
          />
        </div>
        <Button
          disabled={pending}
          type="submit"
          size="lg"
          className="h-11 w-full"
        >
          Send OTP
        </Button>
      </div>
    </form>
  );
}
