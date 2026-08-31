// ─────────────────────────────────────────────────────────────
// Parses /public/concerts.txt into Concert objects.
// The actual concert data lives in that txt file — see the
// comments at the top of it for how to edit it.
// ─────────────────────────────────────────────────────────────

export type Concert = {
  date: string
  year: string
  time: string
  city: string
  venue: string
}

export function parseConcertsText(text: string): Concert[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .map((line) => {
      const [date, year, time, city, venue] = line.split("|").map((part) => part.trim())
      return { date, year, time, city, venue }
    })
    .filter((concert) => concert.date && concert.city)
}
