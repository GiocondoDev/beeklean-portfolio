import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-rule" /> ENTRETIEN PROFESSIONNEL</p>
          <h1 id="hero-title">Des espaces professionnels <em>impeccables.</em></h1>
          <p className="hero-description">Des prestations de nettoyage adaptées aux bureaux, entreprises et espaces communs. Un environnement soigné pour celles et ceux qui le partagent.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/#contact">Demander un devis <span aria-hidden="true">↗</span></Link>
            <a className="button button-outline" href="#services">Découvrir nos services <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-footnote">BeKlean · Services de nettoyage professionnel</p>
        </div>
        <div className="hero-visual">
          {/* Owner-approved stock illustration, not BeKlean premises or a client project. */}
          <picture>
            <source media="(max-width:700px)" srcSet="/images/hero-office-800.webp" type="image/webp" />
            <Image
              className="hero-photo"
              src="/images/hero-office-1600.webp"
              alt="Couloir lumineux dans des bureaux contemporains"
              width={1000}
              height={900}
              unoptimized
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
