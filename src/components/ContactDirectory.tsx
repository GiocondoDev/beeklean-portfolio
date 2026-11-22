import Link from "next/link";
import { CONTACT_GROUPS } from "@/lib/company-contacts";

export default function ContactDirectory() {
  return (
    <section className="directory-section" aria-labelledby="directory-title">
      <div className="container">
        <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> CONTACTS</p>
        <h1 id="directory-title" className="directory-title">Contacter le bon interlocuteur.</h1>
        <p className="directory-intro">Explorez les rubriques de l’annuaire et testez le formulaire sans envoyer de message.</p>
        {CONTACT_GROUPS.filter((group) => group.contacts.length > 0).map((group) => (
          <section className="directory-group" key={group.id} aria-labelledby={`directory-${group.id}`}>
            <h2 id={`directory-${group.id}`}>{group.title}</h2>
            <ul className="directory-list" role="list">
              {group.contacts.map((contact) => (
                <li className="directory-card" key={contact.id}>
                  <h3>{contact.label}</h3>
                  <Link href="/#contact" aria-label={`Tester le formulaire : ${contact.label}`}>Tester le formulaire</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <div className="directory-actions">
          <Link className="button button-dark" href="/#contact">Préparer une demande de devis</Link>
          <Link className="directory-home" href="/">Retour à l’accueil</Link>
        </div>
      </div>
    </section>
  );
}
