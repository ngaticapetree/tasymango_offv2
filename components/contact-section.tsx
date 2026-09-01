"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Instagram, Youtube, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollBlurText } from "@/components/scroll-blur-text"
import { INSTAGRAM_URL } from "@/data/site-links"
import { useYoutubeUrl } from "@/hooks/use-youtube-url"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const youtubeUrl = useYoutubeUrl()

  const socials = [
    { icon: Instagram, label: "Instagram", handle: "tastymango_off", href: INSTAGRAM_URL },
    { icon: Youtube, label: "YouTube", handle: "Tasty Mango", href: youtubeUrl },
  ]

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    }

    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Une erreur est survenue.")
      }

      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="reveal opacity-0 text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-4">
            Contact
          </p>
          <ScrollBlurText
            text="Écrivez-nous"
            className="font-serif text-3xl md:text-4xl text-foreground text-balance mb-6 lg:text-7xl font-light"
          />
          <p className="reveal opacity-0 animation-delay-400 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Booking, collaborations ou simplement un petit mot : notre boîte est toujours ouverte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Socials */}
          <div className="reveal opacity-0 flex flex-col gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 bg-card border border-border/50 rounded-2xl p-5 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <social.icon className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-sm text-muted-foreground">{social.label}</div>
                  <div className="font-medium text-foreground">{social.handle}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="reveal opacity-0 animation-delay-200 bg-card border border-border/50 rounded-3xl p-6 lg:p-8 shadow-lg shadow-primary/5">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-12 gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Send className="w-6 h-6" />
                </span>
                <h3 className="font-serif text-2xl text-foreground">Message envoyé</h3>
                <p className="text-muted-foreground max-w-sm">
                  Merci de nous avoir écrit ! Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Nom
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Votre nom"
                      className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="vous@exemple.fr"
                      className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Sujet
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Booking, presse, collaboration…"
                    className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Votre message…"
                    className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group disabled:opacity-70"
                >
                  {loading ? "Envoi…" : "Envoyer le message"}
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
