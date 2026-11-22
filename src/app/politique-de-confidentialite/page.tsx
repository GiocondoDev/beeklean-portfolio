import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata = createPageMetadata("/politique-de-confidentialite/");

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Politique de confidentialité">
      <section aria-labelledby="privacy-scope">
        <h2 id="privacy-scope">Périmètre</h2>
        <p>Cette page s’applique uniquement à la démonstration de portfolio. Elle ne décrit pas le traitement des données par le site officiel de BeKlean.</p>
      </section>
      <section aria-labelledby="privacy-data">
        <h2 id="privacy-data">Données saisies dans le formulaire</h2>
        <p>Le formulaire permet de tester la saisie, la validation et la préparation d’un brouillon. Utilisez des données fictives et évitez toute information personnelle, sensible ou confidentielle.</p>
      </section>
      <section aria-labelledby="privacy-form">
        <h2 id="privacy-form">Simulation locale</h2>
        <p>Les champs et le brouillon sont traités dans la page. L’application ne les transmet ni à BeKlean ni à un service de messagerie et ne les enregistre pas. La confirmation est simulée dans le navigateur.</p>
      </section>
      <section aria-labelledby="privacy-external">
        <h2 id="privacy-external">Cookies et liens externes</h2>
        <p>L’application n’ajoute ni cookie, ni outil de mesure d’audience, ni traceur publicitaire. Cette description concerne l’application et ne couvre pas les éventuels traitements de l’hébergeur ou des sites ouverts par un lien.</p>
        <p>Les crédits des ressources figurent dans les <Link href="/mentions-legales/">mentions légales</Link>.</p>
      </section>
    </LegalPage>
  );
}
