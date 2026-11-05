import { redirect } from "next/navigation"
import { fetchAddresses } from "@/lib/api/address"
import { fetchMe } from "@/lib/api/profile"
import { AddressSection } from "@/app/(main)/section/profile/AddressSection"
import { ProfileErrorState } from "@/app/(main)/section/profile/ProfileErrorState"
import { ProfileHeader } from "@/app/(main)/section/profile/ProfileHeader"

// User-specific data - kabhi cache nahi
export const dynamic = "force-dynamic"
export const metadata = { title: "My Profile | Desi Chauka" }

export default async function ProfilePage() {
  const [me, addresses] = await Promise.all([fetchMe(), fetchAddresses()])

  if (
    (!me.ok && me.code === "UNAUTHORIZED") ||
    (!addresses.ok && addresses.code === "UNAUTHORIZED")
  ) {
    redirect("/login?next=/profile")
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-6 md:px-6 md:py-10">
      {me.ok ? (
        <ProfileHeader profile={me.data} />
      ) : (
        <ProfileErrorState title="Profile load nahi ho paya" message={me.message} />
      )}

      {addresses.ok ? (
        <AddressSection addresses={addresses.data} />
      ) : (
        <ProfileErrorState title="Addresses load nahi ho paye" message={addresses.message} />
      )}
    </main>
  )
}
