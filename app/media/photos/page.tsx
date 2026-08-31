"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

export default function MediaPage() {
  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch("/gallery-urls.txt")
      .then((res) => res.text())
      .then((text) => {
        const urls = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0 && !line.startsWith("#"))
        setPhotoUrls(urls)
      })
      .finally(() => setLoading(false))
  }, [])

  const showPrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + photoUrls.length) % photoUrls.length)
  }

  const showNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % photoUrls.length)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-40 pb-24 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-4">Média</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground text-balance">
              Nos photos
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : photoUrls.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Les photos arrivent bientôt — revenez faire un tour !
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photoUrls.map((url, index) => (
                <button
                  key={url}
                  onClick={() => setSelectedIndex(index)}
                  className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
                >
                  <img
                    src={url || "/placeholder.svg"}
                    alt="Photo de Tasty Mango"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent
          showCloseButton
          className="max-w-4xl w-full p-0 border-none bg-transparent shadow-none sm:max-w-4xl [&>button]:text-white [&>button]:opacity-100"
        >
          <DialogTitle className="sr-only">Photo</DialogTitle>
          {selectedIndex !== null && (
            <div className="relative">
              <img
                src={photoUrls[selectedIndex] || "/placeholder.svg"}
                alt="Photo de Tasty Mango"
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />

              {photoUrls.length > 1 && (
                <>
                  <button
                    onClick={showPrev}
                    aria-label="Photo précédente"
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/40 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={showNext}
                    aria-label="Photo suivante"
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/40 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
