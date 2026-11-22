import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata = createPageMetadata("/mentions-legales/");

export default function LegalNoticesPage() {
  return (
    <LegalPage title="Mentions légales">
      <section aria-labelledby="legal-identification">
        <h2 id="legal-identification">À propos de cette démonstration</h2>
        <p>Cette version de portfolio présente la refonte du site de BeKlean, une entreprise de nettoyage professionnel. Elle est distincte du site officiel.</p>
      </section>
      <section aria-labelledby="legal-content">
        <h2 id="legal-content">Contenu du site</h2>
        <p>Le nom et l’identité visuelle de BeKlean sont présentés avec l’autorisation de l’entreprise. L’annuaire et le formulaire illustrent le parcours de contact sans permettre d’envoyer une demande à BeKlean.</p>
      </section>
      <section aria-labelledby="legal-photo-credits">
        <h2 id="legal-photo-credits">Crédits photographiques</h2>
        <p>La photographie est utilisée à titre d’illustration. Elle ne représente ni les locaux ni une prestation de BeKlean.</p>
        <ul>
          <li>Nastuh Abootalebi / Unsplash — <a href="https://unsplash.com/photos/hallway-between-glass-panel-doors-yWwob8kwOCk">photographie originale</a>, utilisée sous la <a href="https://unsplash.com/license">licence Unsplash</a>.</li>
        </ul>
      </section>
      <section aria-labelledby="legal-data">
        <h2 id="legal-data">Protection des données personnelles</h2>
        <p>Consultez la <Link href="/politique-de-confidentialite/">politique de confidentialité</Link> de la démonstration pour comprendre le fonctionnement du formulaire.</p>
      </section>
    </LegalPage>
  );
}
