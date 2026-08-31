"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Clock, Loader2 } from "lucide-react"
import { parseConcertsText, type Concert } from "@/lib/concerts"

export function ConcertsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [concerts, setConcerts] = useState<Concert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/concerts.txt")
      .then((res) => res.text())
      .then((text) => setConcerts(parseConcertsText(text)))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [concerts])

  return (
    <section ref={sectionRef} id="concerts" className="py-24 lg:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="reveal opacity-0 text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-4">
            Concerts
          </p>
          <p className="reveal opacity-0 animation-delay-400 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Retrouvez toutes nos prochaines dates de concerts
          </p>
        </div>

        {/* Concert list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : concerts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Aucune date pour le moment — revenez bientôt !
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {concerts.map((concert, index) => (
              <div
                key={`${concert.city}-${concert.date}-${index}`}
                className={`reveal opacity-0 ${
                  index === 1
                    ? "animation-delay-200"
                    : index === 2
                      ? "animation-delay-400"
                      : index >= 3
                        ? "animation-delay-600"
                        : ""
                } group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 bg-card border border-border/50 rounded-2xl p-6 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500`}
              >
                {/* Date */}
                <div className="flex sm:flex-col items-baseline sm:items-center gap-2 sm:gap-0 sm:w-24 shrink-0">
                  <span className="font-serif text-2xl font-medium text-primary">{concert.date}</span>
                  <span className="text-sm text-muted-foreground">{concert.year}</span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-12 bg-border" aria-hidden="true" />

                {/* Venue */}
                <div className="flex-1">
                  <h3 className="font-serif text-xl md:text-2xl font-normal text-foreground">{concert.city}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground mt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{concert.venue}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{concert.time}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
