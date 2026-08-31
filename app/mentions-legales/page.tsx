import { LegalPage, type LegalSection } from "@/components/legal-page"

const sections: LegalSection[] = [
  {
    heading: "Éditeur du site",
    paragraphs: [
      "Le site internet de Tasty Mango est édité et exploité par Tasty Mango.",
      "Pour toute question concernant le site, son contenu ou une demande professionnelle, vous pouvez nous contacter via la page Contact.",
    ],
  },
  {
    heading: "Hébergement",
    paragraphs: ["Le site est hébergé par Vercel, qui assure l'hébergement et la mise à disposition technique du site."],
  },
  {
    heading: "Services et outils tiers",
    paragraphs: [
      "Afin d'assurer le fonctionnement, l'hébergement et certaines fonctionnalités du site, Tasty Mango utilise des services fournis par des tiers, notamment :",
    ],
    list: [
      "Vercel, pour l'hébergement du site et les services associés, notamment Vercel Analytics ;",
      "Brevo, pour la gestion des inscriptions et l'envoi de la newsletter ;",
      "ImgBB, pour l'hébergement de certaines images utilisées sur le site.",
    ],
    afterList: [
      "L'utilisation de ces services peut entraîner le traitement de certaines données conformément à leurs propres politiques de confidentialité. Vous trouverez davantage d'informations à ce sujet dans notre page Confidentialité.",
    ],
  },
  {
    heading: "Contenus et propriété intellectuelle",
    paragraphs: [
      "L'ensemble des contenus présents sur ce site, notamment les photographies, vidéos, textes, éléments graphiques, logos et autres créations, sont protégés par les dispositions applicables en matière de propriété intellectuelle.",
      "Sauf indication contraire ou autorisation préalable, ces contenus ne peuvent pas être reproduits, modifiés, distribués, publiés ou réutilisés à des fins commerciales ou autres.",
      "Nous sommes toutefois ouverts aux collaborations, projets artistiques, médias et autres utilisations de nos contenus. Pour toute demande de réutilisation d'une photographie, d'une vidéo ou de tout autre contenu présent sur le site, nous vous invitons à nous contacter avant toute utilisation.",
    ],
  },
  {
    heading: "Collaborations",
    paragraphs: [
      "Tasty Mango est ouvert aux propositions de collaborations, partenariats, projets artistiques, événements, médias et autres initiatives susceptibles de nous intéresser.",
      "Pour toute proposition, n'hésitez pas à nous contacter via la page Contact.",
    ],
  },
  {
    heading: "Responsabilité",
    paragraphs: [
      "Tasty Mango s'efforce de maintenir les informations publiées sur ce site à jour et de fournir un contenu aussi exact que possible.",
      "Toutefois, nous ne pouvons garantir l'exhaustivité ou l'absence d'erreurs dans l'ensemble des informations publiées. Les dates, horaires, lieux et autres informations relatives aux concerts peuvent notamment être modifiés.",
      "Tasty Mango ne saurait être tenu responsable des dommages résultant de l'utilisation du site ou de l'impossibilité temporaire d'y accéder.",
    ],
  },
  {
    heading: "Liens externes",
    paragraphs: [
      "Le site peut contenir des liens ou intégrer des contenus provenant de services externes. Tasty Mango n'est pas responsable du contenu, du fonctionnement ou des pratiques de confidentialité de ces sites et services tiers.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Pour toute question relative au site, à ses contenus, à une collaboration ou à l'utilisation de nos médias, veuillez utiliser la page Contact.",
    ],
  },
]

export default function MentionsLegalesPage() {
  return (
    <LegalPage eyebrow="Légal" title="Mentions légales" lastUpdated="31 août 2026" sections={sections} />
  )
}
