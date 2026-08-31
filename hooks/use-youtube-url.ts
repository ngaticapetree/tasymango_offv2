"use client"

import { useEffect, useState } from "react"

// Fallback used until /public/youtube-url.txt has loaded, or if it's
// ever empty. Every place on the site that links to YouTube reads
// from this one hook, which in turn reads from that one txt file.
const FALLBACK_YOUTUBE_URL = "#"

export function useYoutubeUrl(): string {
  const [url, setUrl] = useState(FALLBACK_YOUTUBE_URL)

  useEffect(() => {
    let cancelled = false

    fetch("/youtube-url.txt")
      .then((res) => res.text())
      .then((text) => {
        const line = text
          .split("\n")
          .map((l) => l.trim())
          .find((l) => l.length > 0 && !l.startsWith("#"))

        if (!cancelled && line) {
          setUrl(line)
        }
      })
      .catch(() => {
        // Keep the fallback if the file can't be read.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return url
}
