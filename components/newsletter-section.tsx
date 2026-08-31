"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [subscribed, setSubscribed] = useState(false)

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
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <section ref={sectionRef} id="newsletter" className="py-24 lg:py-32 px-6 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <p className="reveal opacity-0 text-sm uppercase tracking-[0.2em] text-primary-foreground/70 font-medium mb-4">
          Newsletter
        </p>
        <h2 className="reveal opacity-0 animation-delay-200 font-serif text-3xl md:text-4xl lg:text-6xl font-light text-balance mb-6">
          Restez dans la vibe
        </h2>
        <p className="reveal opacity-0 animation-delay-400 text-lg text-primary-foreground/80 leading-relaxed mb-10 max-w-xl mx-auto">
          Nouvelles dates, sorties de titres et coulisses : inscrivez-vous pour ne rien manquer de Tasty Mango.
        </p>

        {subscribed ? (
          <div className="reveal opacity-0 animation-delay-600 flex items-center justify-center gap-3 text-primary-foreground">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15">
              <Check className="w-5 h-5" />
            </span>
            <span className="font-medium">Merci ! Vous êtes bien inscrit·e.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="reveal opacity-0 animation-delay-600 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Adresse email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="vous@exemple.fr"
              className="flex-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 px-5 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-6 group shrink-0"
            >
              S&apos;inscrire
              <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
