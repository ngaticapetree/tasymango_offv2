import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export type LegalSection = {
  heading: string
  paragraphs?: string[]
  list?: string[]
  afterList?: string[]
}

type LegalPageProps = {
  eyebrow: string
  title: string
  lastUpdated: string
  sections: LegalSection[]
}

export function LegalPage({ eyebrow, title, lastUpdated, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-40 pb-24 lg:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-4">{eyebrow}</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground text-balance mb-4">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">Dernière mise à jour : {lastUpdated}</p>
          </div>

          <div className="bg-card border border-border/50 rounded-3xl shadow-lg shadow-primary/5 p-6 sm:p-10 lg:p-12 flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.heading || "intro"}>
                {section.heading && (
                  <h2 className="font-serif text-xl md:text-2xl font-normal text-foreground mb-4">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 mb-3 flex flex-col gap-2">
                    {section.list.map((item, index) => (
                      <li key={index} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.afterList?.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
