import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SEARCH_BUTTON_CLASS,
  SEARCH_FORM_CLASS,
  SEARCH_INPUT_CLASS,
  SEARCH_PLACEHOLDER,
} from "./search-styles"

/** JS aane se pehle ka header search - bina JS ke bhi /products?search= par chalta hai */
export function SearchFallback() {
  return (
    <form action="/products" role="search" className={SEARCH_FORM_CLASS}>
      <Search className="ml-4 size-5 shrink-0 text-muted-foreground" />
      <Input
        type="search"
        name="search"
        placeholder={SEARCH_PLACEHOLDER}
        className={SEARCH_INPUT_CLASS}
      />
      <Button type="submit" className={SEARCH_BUTTON_CLASS}>
        Search
      </Button>
    </form>
  )
}
