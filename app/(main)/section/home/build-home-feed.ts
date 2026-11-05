import type {
  HomeCategory,
  HomeData,
  HomeFeedItem,
  HomeSection,
} from "@/types/home"

/** Itne sections ke baad ek categories block aayega */
const SECTIONS_PER_BREAK = 2
/** Ek categories block mein kam se kam itni categories (jab tak total kam na ho) */
const MIN_CATEGORIES_PER_BLOCK = 3
/** Page par zyada se zyada itne categories blocks */
const MAX_CATEGORY_BLOCKS = 6

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

function sectionItem(section: HomeSection): HomeFeedItem {
  return { kind: "section", key: `section-${section.id}`, section }
}

function categoriesItem(categories: HomeCategory[], n: number): HomeFeedItem {
  return { kind: "categories", key: `categories-${n}`, categories }
}

/**
 * Sections ko position se sort karke beech-beech mein categories blocks daalta hai:
 *   S S [C] S S [C] S ...
 * Saari categories kahin na kahin dikhti hain.
 */
export function buildHomeFeed({ sections, categories }: HomeData): HomeFeedItem[] {
  const visible = sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => section.status === "active" && section.products.length > 0)
    // position same ho to API ka order bana rahe
    .sort((a, b) => a.section.position - b.section.position || a.index - b.index)
    .map(({ section }) => section)

  if (categories.length === 0) return visible.map(sectionItem)

  const slots = Math.max(1, Math.floor(visible.length / SECTIONS_PER_BREAK))
  const blockCount = Math.min(
    MAX_CATEGORY_BLOCKS,
    slots,
    Math.ceil(categories.length / MIN_CATEGORIES_PER_BLOCK),
  )
  const blocks = chunk(categories, Math.ceil(categories.length / blockCount))

  const feed: HomeFeedItem[] = []
  let next = 0

  visible.forEach((section, i) => {
    feed.push(sectionItem(section))
    const isBreak = (i + 1) % SECTIONS_PER_BREAK === 0
    if (isBreak && next < blocks.length) {
      feed.push(categoriesItem(blocks[next], next))
      next++
    }
  })

  // Sections kam hon to bachi hui categories end mein dikha do
  if (next < blocks.length) {
    feed.push(categoriesItem(blocks.slice(next).flat(), next))
  }

  return feed
}
