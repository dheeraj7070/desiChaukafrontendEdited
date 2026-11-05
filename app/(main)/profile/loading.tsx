import { ProfileSkeleton } from "@/app/(main)/section/profile/ProfileSkeleton"

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <ProfileSkeleton />
    </main>
  )
}
