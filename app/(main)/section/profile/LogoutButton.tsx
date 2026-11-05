"use client"

import { useFormStatus } from "react-dom"
import { LogOut } from "lucide-react"
import { logoutAction } from "@/app/api/auth/actions"
import { Button } from "@/components/ui/button"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="outline" disabled={pending}>
      <LogOut className="size-4" aria-hidden />
      {pending ? "Logout ho raha hai..." : "Logout"}
    </Button>
  )
}

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <SubmitButton />
    </form>
  )
}
