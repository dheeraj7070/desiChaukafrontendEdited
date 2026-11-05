import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <form
      action="/products"
      role="search"
      className="flex h-11 w-full max-w-2xl items-center overflow-hidden rounded-full border border-input bg-card shadow-xs transition-shadow focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/25 md:h-12"
    >
      <Search className="ml-4 size-5 shrink-0 text-muted-foreground" />
      <Input
        type="search"
        name="search"
        placeholder="Search pickles, thekua, kheer & gifts"
        className="h-full flex-1 text-secondary-foreground  border-0 bg-transparent px-3 shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      <Button
        type="submit"
        className="h-full rounded-none px-5 font-bold sm:px-7 border-none"
      >
        Search
      </Button>
    </form>
  )
}