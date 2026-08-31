"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollBlurTextProps {
  text: string
  className?: string
  startBlur?: number
  endBlur?: number
}

export function ScrollBlurText({ text, className = "", startBlur = 80, endBlur = 0 }: ScrollBlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [wordProgress, setWordProgress] = useState<number[]>([])

  const words = text.split(" ")

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate when element enters viewport (bottom) to when it reaches center
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.6)))

      const newProgress = words.map((_, index) => {
        const wordDelay = index * 0.2 // Stagger delay per word (increased from 0.15)
        const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordDelay) / 0.3))
        return wordProgress
      })

      setWordProgress(newProgress)
    }

    handleScroll() // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [words.length])

  return (
    <h2 ref={containerRef} className={className}>
      {words.map((word, index) => {
        const progress = wordProgress[index] || 0
        const blur = startBlur - (startBlur - endBlur) * progress
        const opacity = progress

        return (
          <span
            key={index}
            style={{
              filter: `blur(${blur}px)`,
              opacity,
              display: "inline-block",
              transition: "filter 0.3s ease-out, opacity 0.3s ease-out",
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        )
      })}
    </h2>
  )
}
