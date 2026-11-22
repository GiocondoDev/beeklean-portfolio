import Link from "next/link";

const navigation = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Services", href: "/#services" },
  { label: "À propos", href: "/#apropos" },
  { label: "Contact", href: "/contact/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-intro">
            <Link className="brand footer-brand" href="/#accueil" aria-label="BeKlean, accueil">Be<span>Klean</span><span className="brand-dot">.</span></Link>
            <p>Entretien des bureaux, entreprises et espaces communs.</p>
          </div>
          <nav className="footer-navigation" aria-label="Navigation de pied de page">
            <p className="footer-heading">Navigation</p>
            <ul>
              {navigation.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}
            </ul>
          </nav>
          <div className="footer-contact">
            <p className="footer-heading">Contact</p>
            <address>
              <Link href="/contact/">Annuaire de démonstration</Link>
              <Link href="/#contact">Tester le formulaire</Link>
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <small>© {year} BeKlean. Tous droits réservés.</small>
          <Link className="button button-light footer-cta" href="/#contact">Demander un devis <span aria-hidden="true">↗</span></Link>
        </div>
        <nav className="footer-legal" aria-label="Informations légales">
          <Link href="/mentions-legales/">Mentions légales</Link>
          <Link href="/politique-de-confidentialite/">Politique de confidentialité</Link>
        </nav>
      </div>
    </footer>
  );
}
