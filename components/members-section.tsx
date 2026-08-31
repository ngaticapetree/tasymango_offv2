"use client"

import { useEffect, useRef } from "react"

const members = [
  {
    name: "Noah Gatica-Petree",
    role: "Percussions",
    photo: "/images/member-noah.jpg",
    bio: "Formé pendant dix ans au Conservatoire de Lausanne dans la classe de Romain Kuonen, Noah s'est tourné vers des percussions plus tactiles après plusieurs années dans le programme classique de la FEM. Des instruments d'Afrique du Nord à la musique latine en passant par le Proche-Orient, ce parcours singulier lui a valu deux premiers prix au Swiss Percussion Competition (2021, 2023). Membre des Ministrings depuis sept ans, il a effectué six tournées en Europe et s'épanouit aujourd'hui pleinement dans l'univers latin.",
  },
  {
    name: "Aurèle Castioni",
    role: "Contrebasse",
    photo: "/images/member-aurele.jpg",
    bio: "Né dans une famille de mélomanes, Aurèle commence le violoncelle à 4 ans puis se tourne vers la contrebasse, qu'il pratique depuis six ans dans la classe de David Brito au Conservatoire de Lausanne. Membre de la Structure Musique École depuis l'âge de 9 ans, il est lauréat de plusieurs concours dont le SJMW en solo et en duo, ainsi que le Concours Baroque de Sion. Il fait également partie des Ministrings et de Tutti Solisti, et a participé plusieurs fois à l'ONJMS.",
  },
  {
    name: "Elisa de Andrés",
    role: "Flûte traversière",
    photo: "/images/member-elisa.jpg",
    bio: "Née à Lausanne, Elisa intègre la classe de flûte traversière de Sandra Latour dès l'âge de 6 ans. Membre de la Structure Musique École depuis ses 9 ans, elle poursuit aujourd'hui la filière Pré-HEM. Lauréate de nombreux concours, elle décroche le 1er prix à l'unanimité au Tampere Flute Fest en Finlande (2020), une nomination au concours de flûte de Tokyo (2020), et plusieurs premiers prix aux concours de la Côte et de Sion. Elle joue aussi dans plusieurs ensembles de musique de chambre et orchestres.",
  },
  {
    name: "Raphaël Bollengier",
    role: "Piano",
    photo: "/images/member-raphael.jpg",
    bio: "Raphaël commence le piano à 5 ans avec Guillaume Hersperger et obtient son certificat de fin d'étude non-professionnelle à 14 ans. Il rejoint en 2023 la filière Pré-HEM, le rapprochant de la Haute École de Musique. Lauréat de plus de 20 compétitions nationales et internationales, dont le concours Lavaux Classic (2022, 2023, 2024), il se produit régulièrement en récital, en musique de chambre et en soliste sur des scènes en Suisse et en France, et élargit son style vers la musique ancienne et la composition néo-romantique.",
  },
]

export function MembersSection() {
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
    <section ref={sectionRef} id="membres" className="py-24 lg:py-32 px-6 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <p className="reveal opacity-0 text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-4">
            Qui sommes-nous ?
          </p>
          <h2 className="reveal opacity-0 animation-delay-200 font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground text-balance">
            Quatre amis musiciens du Conservatoire de Lausanne
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {members.map((member, index) => (
            <div
              key={member.name}
              className={`reveal opacity-0 animation-delay-${Math.min(index * 200, 600)} flex flex-col`}
            >
              <div className="relative rounded-[32px] overflow-hidden shadow-lg shadow-primary/10 aspect-[3/4] mb-6">
                <img
                  src={member.photo || "/placeholder.svg"}
                  alt={`${member.name}, ${member.role} de Tasty Mango`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl text-foreground font-medium mb-1">{member.name}</h3>
              <p className="text-sm uppercase tracking-[0.15em] text-primary font-medium mb-4">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
