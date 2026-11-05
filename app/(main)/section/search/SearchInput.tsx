"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Loader2, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SEARCH_BUTTON_CLASS,
  SEARCH_FORM_CLASS,
  SEARCH_INPUT_CLASS,
  SEARCH_PLACEHOLDER,
} from "./search-styles"

const RESULTS_PATH = "/products"
const DEBOUNCE_MS = 300

/**
 * Header ka search. Header layout mein hai, isliye navigate karne par ye remount nahi hota
 * aur focus/cursor bana rehta hai - user ko navigation ka pata hi nahi chalta.
 *
 *  - focus          -> /products par push (sirf tab jab wahan na ho)
 *  - typing         -> 300ms debounce ke baad replace (history mein entry nahi badhti)
 *  - Enter / button -> turant search, keyboard band
 */
export default function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()

  const onResults = pathname === RESULTS_PATH
  const urlTerm = onResults ? (searchParams.get("search") ?? "") : ""

  const [value, setValue] = useState(urlTerm)
  const valueRef = useRef(value)
  valueRef.current = value

  // Jo terms humne khud URL mein bheje (unka URL baad mein aayega) aur aakhri bheja hua term
  const sent = useRef<string[]>([])
  const lastSent = useRef(urlTerm)

  const navigate = useCallback(
    (term: string, method: "push" | "replace") => {
      const params = new URLSearchParams(onResults ? searchParams.toString() : "")
      if (term) params.set("search", term)
      else params.delete("search")
      const qs = params.toString()

      lastSent.current = term
      sent.current.push(term)

      startTransition(() => {
        router[method](
          qs ? `${RESULTS_PATH}?${qs}` : RESULTS_PATH,
          method === "replace" ? { scroll: false } : undefined,
        )
      })
    },
    [onResults, router, searchParams],
  )

  // URL bahar se badle (back/forward, link) to input ko uske saath sync karo.
  // Humare apne navigations ko ignore karte hain, warna tez typing mein text wapas "jump" karta.
  useEffect(() => {
    const i = sent.current.indexOf(urlTerm)
    if (i !== -1) {
      sent.current.splice(0, i + 1)
      return
    }
    sent.current = []
    lastSent.current = urlTerm
    if (urlTerm !== valueRef.current) setValue(urlTerm)
  }, [urlTerm])

  // Debounced live search - sirf results page par
  useEffect(() => {
    if (!onResults) return
    const term = value.trim()
    if (term === lastSent.current) return
    const t = setTimeout(() => navigate(term, "replace"), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [value, onResults, navigate])

  return (
    <form
      action={RESULTS_PATH}
      role="search"
      className={SEARCH_FORM_CLASS}
      onSubmit={(e) => {
        e.preventDefault()
        const term = value.trim()
        if (!onResults) navigate(term, "push")
        else if (term !== lastSent.current) navigate(term, "replace")
        inputRef.current?.blur()
      }}
    >
      {isPending ? (
        <Loader2 className="ml-4 size-5 shrink-0 animate-spin text-muted-foreground" />
      ) : (
        <Search className="ml-4 size-5 shrink-0 text-muted-foreground" />
      )}

      <Input
        ref={inputRef}
        type="search"
        name="search"
        value={value}
        placeholder={SEARCH_PLACEHOLDER}
        autoComplete="off"
        enterKeyHint="search"
        aria-label="Search products"
        className={`${SEARCH_INPUT_CLASS} [&::-webkit-search-cancel-button]:hidden`}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => {
          if (!onResults) navigate(valueRef.current.trim(), "push")
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") inputRef.current?.blur()
        }}
      />

      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setValue("")
            inputRef.current?.focus()
          }}
          className="mr-2 grid size-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <X className="size-4" />
        </button>
      )}

      <Button type="submit" className={SEARCH_BUTTON_CLASS}>
        Search
      </Button>
    </form>
  )
}
