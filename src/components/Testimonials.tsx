export type Testimonial = {
  id: string;
  quote: string;
  author: string;
};

// These cards show the layout; they are not endorsements or customer statements.
const sampleCards: readonly Testimonial[] = [
  {
    id: "sample-1",
    quote: "Exemple de carte courte, présenté pour illustrer la mise en page.",
    author: "Exemple 01 · Aucun avis client",
  },
  {
    id: "sample-2",
    quote: "Exemple de carte plus longue, présenté pour illustrer la disposition du texte et de son attribution sur les écrans de différentes tailles.",
    author: "Exemple 02 · Aucun avis client",
  },
];

export default function Testimonials({ items = sampleCards }: { items?: readonly Testimonial[] } = {}) {
  if (items.length === 0) return null;

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="container">
        <p className="eyebrow testimonials-eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> TÉMOIGNAGES · APERÇU</p>
        <h2 id="testimonials-title" className="testimonials-title">Présentation des avis.</h2>
        <div className="testimonials-grid">
          {items.map((item) => (
            <figure className="testimonial-card" key={item.id}>
              <span className="testimonial-quote-mark" aria-hidden="true">“</span>
              <blockquote><p>{item.quote}</p></blockquote>
              <figcaption className="testimonial-attribution">{item.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
