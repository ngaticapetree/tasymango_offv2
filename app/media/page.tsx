"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Camera, Youtube, ArrowRight } from "lucide-react"
import { useYoutubeUrl } from "@/hooks/use-youtube-url"

export default function MediaHubPage() {
  const youtubeUrl = useYoutubeUrl()

  const items = [
    {
      name: "Galerie Photos",
      description: "Les meilleurs instants de nos concerts et coulisses, capturés par nos photographes.",
      icon: Camera,
      href: "/media/photos",
      external: false,
    },
    {
      name: "Vidéos",
      description: "Retrouvez nos clips, lives et coulisses en vidéo sur notre chaîne YouTube.",
      icon: Youtube,
      href: youtubeUrl,
      external: true,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-40 pb-24 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-4">Média</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground text-balance">
              Vidéos et Photos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6">
              Plongez dans l&apos;univers de Tasty Mango : les vidéos et images de nos concerts.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group bg-card rounded-3xl border border-border/50 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 p-8 flex flex-col items-center text-center gap-4"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                  <item.icon className="w-6 h-6" />
                </span>
                <h2 className="font-serif text-foreground text-2xl font-normal">{item.name}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                <span className="inline-flex items-center text-primary group/btn mt-1">
                  Découvrir
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
