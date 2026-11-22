import Link from "next/link";

const services = [
  { number: "01", icon: "▦", name: "Nettoyage de bureaux", description: "Des espaces de travail entretenus pour accueillir vos équipes et visiteurs." },
  { number: "02", icon: "⌂", name: "Parties communes", description: "L’entretien des zones partagées de vos immeubles et résidences." },
  { number: "03", icon: "▤", name: "Espaces commerciaux", description: "Des espaces commerciaux soignés et accueillants pour votre clientèle." },
  { number: "04", icon: "◇", name: "Nettoyage de vitres", description: "Des surfaces vitrées propres pour des espaces lumineux." },
  { number: "05", icon: "+", name: "Autres prestations", description: "Parlez-nous de vos besoins pour définir une solution adaptée." },
];

export default function Services() {
  return (
    <section id="services" className="services-section" aria-labelledby="services-title">
      <div className="container">
        <div className="services-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> NOS DOMAINES D’INTERVENTION</p>
            <h2 id="services-title">Des solutions pour <em>chaque espace.</em></h2>
          </div>
          <p>Des prestations pensées pour les environnements professionnels et les espaces communs.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top">
                <span className="service-icon" aria-hidden="true">{service.icon}</span>
                <span className="service-number">{service.number}</span>
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <Link href="/#contact" className="service-link" aria-label={`Demander un devis pour ${service.name}`}>
                Demander un devis <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
