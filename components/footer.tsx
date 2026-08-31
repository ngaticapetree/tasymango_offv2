"use client"

import { useState } from "react"
import Link from "next/link"
import { Instagram, Youtube, ChevronDown } from "lucide-react"
import { INSTAGRAM_URL } from "@/data/site-links"
import { useYoutubeUrl } from "@/hooks/use-youtube-url"

const mainNavLinks = [
  { label: "Le Groupe", href: "#groupe" },
  { label: "Concerts", href: "#concerts" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  const youtubeUrl = useYoutubeUrl()
  const [mediaOpen, setMediaOpen] = useState(false)

  const socialIcons = [
    { icon: Instagram, label: "Instagram", href: INSTAGRAM_URL },
    { icon: Youtube, label: "YouTube", href: youtubeUrl },
  ]

  const mediaSubLinks = [
    { label: "Galerie Photos", href: "/media/photos", external: false },
    { label: "Vidéos", href: youtubeUrl, external: true },
  ]

  return (
    <footer className="bg-foreground text-background py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                <span className="text-foreground font-serif text-sm font-medium">T</span>
              </div>
              <span className="font-serif text-xl font-medium text-background">Tasty Mango</span>
            </Link>
            <p className="text-background/70 leading-relaxed mb-6 max-w-sm">
              Ce site a été conçu et est maintenu par Noah Gatica-Petree. N&apos;hésitez pas à me contacter en cas de
              problème à signaler.
            </p>
            <div className="flex items-center gap-3">
              {socialIcons.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-background mb-4">Navigation</h4>
            <ul className="space-y-3">
              {mainNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Média with clickable sub-sections */}
              <li>
                <button
                  type="button"
                  onClick={() => setMediaOpen(!mediaOpen)}
                  className="flex items-center gap-1.5 text-sm text-background/70 hover:text-background transition-colors"
                  aria-expanded={mediaOpen}
                >
                  Média
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mediaOpen ? "rotate-180" : ""}`} />
                </button>
                {mediaOpen && (
                  <ul className="mt-3 ml-3 space-y-3 border-l border-background/10 pl-3">
                    {mediaSubLinks.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          target={sub.external ? "_blank" : undefined}
                          rel={sub.external ? "noopener noreferrer" : undefined}
                          className="text-sm text-background/70 hover:text-background transition-colors"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* Suivre */}
          <div>
            <h4 className="font-medium text-background mb-4">Nous suivre</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href={youtubeUrl}
                  target={youtubeUrl.startsWith("http") ? "_blank" : undefined}
                  rel={youtubeUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">© 2026 Tasty Mango. Tous droits réservés.</p>
          <div className="flex gap-6 text-sm text-background/50">
            <Link href="/mentions-legales" className="hover:text-background transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-background transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
