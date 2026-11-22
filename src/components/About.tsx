import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="apropos" className="about-section" aria-labelledby="about-title">
      <div className="container about-grid">
        <figure className="about-visual">
          {/* Licensed stock illustration, not BeKlean employees or a client project. */}
          <picture className="about-photo-frame">
            <source media="(max-width:700px)" srcSet="/images/hero-office-800.webp" type="image/webp" />
            <Image
              className="about-photo"
              src="/images/hero-office-1600.webp"
              alt="Couloir lumineux dans des bureaux contemporains"
              width={1000}
              height={900}
              unoptimized
            />
          </picture>
          <figcaption className="about-photo-caption">Photo d’illustration · Sans lien avec BeKlean.</figcaption>
        </figure>
        <div className="about-copy">
          <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> À PROPOS DE BEKLEAN</p>
          <h2 id="about-title" className="about-title">Un partenaire pour l&apos;entretien de vos espaces.</h2>
          <p>BeKlean propose des prestations de nettoyage pour les bureaux, les espaces commerciaux et les parties communes d’immeubles.</p>
          <p>Vous représentez une entreprise ou gérez un immeuble résidentiel ? Présentez-nous vos besoins pour échanger sur l’entretien de vos espaces.</p>
          <Link className="button button-dark about-cta" href="/#contact">
            Parlons de vos besoins <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
