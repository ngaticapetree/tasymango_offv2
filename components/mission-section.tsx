"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)

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
    <section ref={sectionRef} id="groupe" className="py-24 lg:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <div className="reveal opacity-0 order-1">
            <div className="relative rounded-[40px] overflow-hidden shadow-xl shadow-primary/10">
              <img
                src="/images/tasty-mango-band.jpg"
                alt="Les quatre musiciens du groupe Tasty Mango avec leurs instruments"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-2">
            <p className="reveal opacity-0 text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-4">
              Le Groupe
            </p>
            <h2 className="reveal opacity-0 animation-delay-200 font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground text-balance mb-8">
              Une musique latine rafraîchissante, pétillante et vivifiante
            </h2>
            <div className="reveal opacity-0 animation-delay-400 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Fondé en 2024, Tasty Mango est un ensemble de musique latine constitué de 4 amis musiciens du
                Conservatoire de Lausanne, sous la supervision du contrebassiste David Brito. Ils se sont produits sur
                de nombreuses scènes de Suisse Romande telles que le Lavaux Classic, ou encore à la fête de la musique à
                l&apos;EJMA. Ils ont également obtenu en 2025 le titre du «&nbsp;Meilleur groupe de l&apos;année&nbsp;»
                dans la catégorie Jazz et Musiques actuelles du Concours Suisse pour la Jeunesse.
              </p>
              <p>
                Transmettre des émotions fortes, inclure le public avec des chants populaires ou encore improviser le
                show font partie de leurs spectacles qu&apos;ils veulent rafraîchissants, pétillants et vivifiants.
              </p>
            </div>
            <div className="reveal opacity-0 animation-delay-600 mt-10">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 group"
              >
                <a href="#concerts">
                  Voir nos concerts
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
