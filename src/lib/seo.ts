import type { Metadata } from "next";

const pages = {
  "/": {
    title: "Nettoyage professionnel à Bruxelles | BeKlean",
    description: "BeKlean propose le nettoyage de bureaux, commerces, vitres et parties communes à Bruxelles et dans les environs. Présentez-nous vos besoins pour un devis.",
  },
  "/contact/": {
    title: "Contact et demande de devis | BeKlean",
    description: "Explorez l’annuaire de démonstration et le formulaire de devis de la refonte BeKlean.",
  },
  "/mentions-legales/": {
    title: "Mentions légales | BeKlean",
    description: "Découvrez le contexte de la démonstration BeKlean et les crédits photographiques.",
  },
  "/politique-de-confidentialite/": {
    title: "Politique de confidentialité | BeKlean",
    description: "Découvrez comment le formulaire de démonstration BeKlean traite les saisies localement, sans envoi.",
  },
} as const;

export function createPageMetadata(path: keyof typeof pages): Metadata {
  const { title, description } = pages[path];

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "fr_BE",
      siteName: "BeKlean",
      title,
      description,
    },
    twitter: { card: "summary", title, description },
  };
}
