// Purane header search.tsx ki jagah. navbar.tsx mein koi badlaav nahi chahiye.
import { Suspense } from "react"
import SearchInput from "@/app/(main)/section/search/SearchInput"
import { SearchFallback } from "@/app/(main)/section/search/SearchFallback"

export default function SearchBar() {
  // useSearchParams ke liye Suspense zaroori hai (header har page par hai)
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchInput />
    </Suspense>
  )
}
