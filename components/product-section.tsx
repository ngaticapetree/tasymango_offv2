"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Camera, Youtube } from "lucide-react"
import { ScrollBlurText } from "@/components/scroll-blur-text"
import { useYoutubeUrl } from "@/hooks/use-youtube-url"

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const youtubeUrl = useYoutubeUrl()

  const mediaItems = [
    {
      name: "Galerie Photos",
      icon: Camera,
      href: "/media/photos",
      external: false,
    },
    {
      name: "Vidéos",
      icon: Youtube,
      href: youtubeUrl,
      external: true,
    },
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

  return (
    <section ref={sectionRef} id="media" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="reveal opacity-0 text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-4">
            Média
          </p>
          <ScrollBlurText
            text="Vidéos et Photos"
            className="font-serif text-3xl text-foreground text-balance mb-6 md:text-7xl font-light"
          />
          <p className="reveal opacity-0 animation-delay-400 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Plongez dans l&apos;univers de Tasty Mango : les vidéos et images de nos concerts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          {mediaItems.map((item, index) => (
            <div
              key={item.name}
              className={`reveal opacity-0 ${index === 1 ? "animation-delay-200" : ""} group`}
            >
              <div className="bg-card rounded-3xl border border-border/50 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 p-8 flex flex-col items-center text-center gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                  <item.icon className="w-6 h-6" />
                </span>
                <h3 className="font-serif text-foreground text-2xl font-normal">{item.name}</h3>
                <Button
                  asChild
                  variant="ghost"
                  className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto group/btn"
                >
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    Découvrir
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
