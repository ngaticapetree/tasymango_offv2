"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Instagram, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { INSTAGRAM_URL } from "@/data/site-links"
import { useYoutubeUrl } from "@/hooks/use-youtube-url"

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Le Groupe", href: "#groupe" },
  { label: "Concerts", href: "#concerts" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false)
  const youtubeUrl = useYoutubeUrl()

  const mediaSubLinks = [
    { label: "Galerie Photos", href: "/media/photos", external: false },
    { label: "Vidéos", href: youtubeUrl, external: true },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6">
      <nav className="max-w-7xl mx-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-3xl shadow-lg">
        <div className="flex items-center justify-between h-20 px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <span className="font-serif text-foreground text-2xl font-normal">Tasty Mango</span>
            </Link>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivez-nous sur Instagram"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border/50 text-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="#groupe"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Le Groupe
            </Link>
            <Link
              href="#concerts"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Concerts
            </Link>

            {/* Média dropdown */}
            <div className="relative group">
              <Link
                href="/media"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Média
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </Link>

              <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
                <div className="bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg p-2 min-w-[180px] flex flex-col">
                  {mediaSubLinks.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      target={sub.external ? "_blank" : undefined}
                      rel={sub.external ? "noopener noreferrer" : undefined}
                      className="px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors whitespace-nowrap"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
              <Link href="#newsletter">Newsletter</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Ouvrir le menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 px-6 lg:px-8 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Média with expandable sub-links */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileMediaOpen(!mobileMediaOpen)}
                  className="flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground transition-colors"
                  aria-expanded={mobileMediaOpen}
                >
                  Média
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileMediaOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileMediaOpen && (
                  <div className="mt-3 ml-4 flex flex-col gap-3 border-l border-border/50 pl-4">
                    {mediaSubLinks.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        target={sub.external ? "_blank" : undefined}
                        rel={sub.external ? "noopener noreferrer" : undefined}
                        className="text-base text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-full mt-4"
              >
                <Link href="#newsletter" onClick={() => setIsOpen(false)}>
                  Newsletter
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
