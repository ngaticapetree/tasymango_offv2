import { LegalPage, type LegalSection } from "@/components/legal-page"

const sections: LegalSection[] = [
  {
    heading: "",
    paragraphs: [
      "Chez Tasty Mango, nous accordons une grande importance au respect de votre vie privée.",
      "Nous avons conçu ce site dans une logique de simplicité et de minimisation des données : nous ne cherchons pas à vous identifier personnellement ni à constituer des profils sur les visiteurs du site.",
      "Cette page explique quelles données peuvent être traitées lorsque vous utilisez notre site et pourquoi.",
    ],
  },
  {
    heading: "1. Données collectées",
    paragraphs: [
      "La consultation du site ne nécessite pas de créer un compte et nous ne demandons pas de données personnelles simplement pour visiter nos pages.",
      "Nous ne vendons, ne louons et ne partageons pas vos données personnelles à des fins publicitaires.",
      "Certaines données peuvent toutefois être traitées lorsque vous utilisez certaines fonctionnalités du site ou lorsque des services tiers sont nécessaires à son fonctionnement.",
    ],
  },
  {
    heading: "2. Vercel Analytics",
    paragraphs: [
      "Le site utilise Vercel Analytics afin de comprendre, de manière générale et agrégée, comment le site est utilisé et d'améliorer son fonctionnement.",
      "Ces données peuvent notamment permettre de mesurer la fréquentation du site et de comprendre quelles pages sont consultées.",
      "Vercel Analytics est utilisé à des fins statistiques et d'amélioration du site. Tasty Mango ne cherche pas à utiliser ces données pour identifier individuellement les visiteurs.",
      "Pour davantage d'informations sur la manière dont Vercel traite les données, nous vous invitons à consulter sa propre documentation et sa politique de confidentialité.",
    ],
  },
  {
    heading: "3. Newsletter et Brevo",
    paragraphs: [
      "Si vous choisissez de vous inscrire à la newsletter de Tasty Mango, votre adresse e-mail est transmise à Brevo, notre prestataire de gestion et d'envoi de newsletters.",
      "Cette adresse est utilisée uniquement pour vous envoyer les communications auxquelles vous avez choisi de vous inscrire, telles que les nouvelles dates, projets, actualités et contenus liés à Tasty Mango.",
      "Brevo peut également traiter certaines informations techniques liées à l'inscription et à l'envoi des e-mails, conformément à ses propres pratiques et obligations légales.",
      "Vous pouvez vous désinscrire de la newsletter à tout moment grâce au lien de désinscription présent dans chaque e-mail.",
      "Nous ne vendons pas les adresses e-mail de nos abonnés et ne les utilisons pas à des fins étrangères à la gestion de notre newsletter.",
    ],
  },
  {
    heading: "4. Formulaire de contact",
    paragraphs: [
      "Lorsque vous nous contactez via le formulaire de contact, les informations que vous choisissez de nous transmettre sont utilisées uniquement pour répondre à votre demande et poursuivre l'échange nécessaire à son traitement.",
      "Nous ne constituons pas de fichier commercial à partir des demandes reçues et nous ne vendons ni ne louons ces informations à des tiers.",
      "Nous vous recommandons toutefois de ne pas transmettre d'informations sensibles ou confidentielles via le formulaire de contact.",
    ],
  },
  {
    heading: "5. Images et ImgBB",
    paragraphs: [
      "Certaines images affichées sur le site peuvent être hébergées par ImgBB, un service tiers d'hébergement d'images.",
      "Le chargement de ces images peut entraîner une connexion avec les serveurs d'ImgBB et le traitement de certaines données techniques nécessaires à la fourniture du contenu.",
      "Ce service est utilisé uniquement pour permettre l'affichage des images concernées sur le site.",
    ],
  },
  {
    heading: "6. Cookies et technologies similaires",
    paragraphs: [
      "Nous cherchons à limiter au strict nécessaire l'utilisation de cookies et de technologies similaires.",
      "Le site n'utilise pas de cookies destinés à vous suivre à des fins publicitaires et nous ne mettons pas en place de système de profilage publicitaire des visiteurs.",
      "Certains services techniques ou tiers utilisés par le site peuvent néanmoins employer leurs propres mécanismes techniques. Leur utilisation est alors soumise aux politiques de confidentialité des prestataires concernés.",
    ],
  },
  {
    heading: "7. Conservation des données",
    paragraphs: [
      "Nous conservons les données personnelles uniquement pendant la durée nécessaire à la finalité pour laquelle elles ont été transmises ou pendant la durée imposée par les obligations légales applicables.",
      "Une adresse e-mail utilisée pour la newsletter peut notamment être conservée jusqu'à votre désinscription.",
      "Les données liées à une demande de contact peuvent être conservées pendant la durée nécessaire au traitement de cette demande et, lorsque cela est pertinent, à la poursuite de nos échanges.",
    ],
  },
  {
    heading: "8. Vos droits",
    paragraphs: [
      "Conformément à la législation applicable en matière de protection des données, vous pouvez disposer de différents droits concernant vos données personnelles, notamment le droit d'accéder aux données vous concernant, de demander leur rectification ou leur suppression, et de vous opposer à certains traitements.",
      "Vous pouvez également retirer votre consentement lorsqu'un traitement repose sur celui-ci.",
      "Pour toute demande concernant vos données personnelles ou l'exercice de vos droits, contactez-nous via la page Contact.",
    ],
  },
  {
    heading: "9. Services tiers",
    paragraphs: [
      "Le site utilise certains services fournis par des entreprises tierces, notamment Vercel, Brevo et ImgBB.",
      "Ces prestataires peuvent traiter certaines données dans le cadre de leurs services. Leurs propres politiques de confidentialité peuvent donc également s'appliquer.",
      "Nous sélectionnons ces services en tenant compte, autant que possible, de leur capacité à proposer des pratiques respectueuses de la protection des données.",
    ],
  },
  {
    heading: "10. Notre engagement",
    paragraphs: [
      "Tasty Mango souhaite maintenir un site simple, transparent et respectueux de ses visiteurs.",
      "Nous ne cherchons pas à collecter davantage d'informations que nécessaire, à suivre les visiteurs à des fins publicitaires ou à vendre leurs données.",
      "Si nos pratiques ou les services utilisés sur le site évoluent, cette politique pourra être mise à jour afin de refléter ces changements.",
    ],
  },
]

export default function ConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Légal"
      title="Politique de confidentialité"
      lastUpdated="31 août 2026"
      sections={sections}
    />
  )
}
