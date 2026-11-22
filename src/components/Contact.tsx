"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { buildQuoteMessage, normalizeQuote, QUOTE_LIMITS, QUOTE_SERVICES, validateQuote, type QuoteErrors, type QuoteRequest } from "@/lib/quote-request";

const emptyQuote: QuoteRequest = { fullName: "", organization: "", service: "", locality: "", details: "" };

export default function Contact() {
  const [values, setValues] = useState<QuoteRequest>(emptyQuote);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [message, setMessage] = useState("");
  const [simulated, setSimulated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const previewHeadingRef = useRef<HTMLHeadingElement>(null);

  function update(field: keyof QuoteRequest, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setMessage("");
    setSimulated(false);
  }

  function prepareMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeQuote(values);
    const nextErrors = validateQuote(normalized);
    setErrors(nextErrors);
    setMessage("");
    setSimulated(false);
    const firstInvalid = (Object.keys(nextErrors) as (keyof QuoteRequest)[])[0];
    if (firstInvalid) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`#quote-${firstInvalid}`)?.focus());
      return;
    }
    setValues(normalized);
    setMessage(buildQuoteMessage(normalized));
    requestAnimationFrame(() => previewHeadingRef.current?.focus());
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> CONTACT &amp; DEVIS</p>
          <h2 id="contact-title" className="contact-title">Parlons de l’entretien de vos espaces.</h2>
          <p>Essayez le parcours de devis de BeKlean avec des données fictives.</p>
          <address className="contact-details">
            <Link href="/politique-de-confidentialite/">Confidentialité de la démonstration</Link>
            <Link href="/contact/">Consulter l’annuaire de démonstration</Link>
          </address>
          <p className="contact-privacy" id="quote-privacy">L’envoi est simulé. L’application n’enregistre pas vos saisies et ne transmet pas votre message. Utilisez uniquement des données fictives.</p>
        </div>
        <div className="contact-panel">
          <form ref={formRef} action="#contact" noValidate onSubmit={prepareMessage} aria-label="Préparer une demande de devis" aria-describedby="quote-required quote-privacy">
            <p id="quote-required" className="contact-help">Les champs marqués d’un * sont obligatoires.</p>
            <noscript><p className="contact-help">Activez JavaScript pour préparer et tester le message dans cette démonstration.</p></noscript>
            {Object.values(errors).some(Boolean) && <p className="contact-error" role="alert">Veuillez vérifier les champs indiqués.</p>}
            {/* IDs support labels and focus; omit names to avoid a native GET leaking values without JavaScript. */}
            <div className="contact-fields">
              <div className="contact-field">
                <label htmlFor="quote-fullName">Nom et prénom <span aria-hidden="true">*</span></label>
                <input id="quote-fullName" type="text" autoComplete="name" required minLength={2} maxLength={QUOTE_LIMITS.fullName} value={values.fullName} onChange={(event) => update("fullName", event.target.value)} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "quote-fullName-error" : undefined} />
                {errors.fullName && <p id="quote-fullName-error" className="contact-error">{errors.fullName}</p>}
              </div>
              <div className="contact-field">
                <label htmlFor="quote-organization">Organisation (facultatif)</label>
                <input id="quote-organization" type="text" autoComplete="organization" maxLength={QUOTE_LIMITS.organization} value={values.organization} onChange={(event) => update("organization", event.target.value)} aria-invalid={Boolean(errors.organization)} aria-describedby={errors.organization ? "quote-organization-error" : undefined} />
                {errors.organization && <p id="quote-organization-error" className="contact-error">{errors.organization}</p>}
              </div>
              <div className="contact-field">
                <label htmlFor="quote-service">Service souhaité <span aria-hidden="true">*</span></label>
                <select id="quote-service" required value={values.service} onChange={(event) => update("service", event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "quote-service-error" : undefined}>
                  <option value="">Sélectionnez un service</option>
                  {QUOTE_SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
                {errors.service && <p id="quote-service-error" className="contact-error">{errors.service}</p>}
              </div>
              <div className="contact-field">
                <label htmlFor="quote-locality">Commune concernée <span aria-hidden="true">*</span></label>
                <input id="quote-locality" type="text" autoComplete="address-level2" required minLength={2} maxLength={QUOTE_LIMITS.locality} value={values.locality} onChange={(event) => update("locality", event.target.value)} aria-invalid={Boolean(errors.locality)} aria-describedby={errors.locality ? "quote-locality-error" : undefined} />
                {errors.locality && <p id="quote-locality-error" className="contact-error">{errors.locality}</p>}
              </div>
              <div className="contact-field contact-field-wide">
                <label htmlFor="quote-details">Votre besoin <span aria-hidden="true">*</span></label>
                <p id="quote-details-help" className="contact-help">Précisez les espaces et le type d’entretien souhaité, sans informations confidentielles (10 à 1 000 caractères).</p>
                <textarea id="quote-details" rows={4} required minLength={10} maxLength={QUOTE_LIMITS.details} value={values.details} onChange={(event) => update("details", event.target.value)} aria-invalid={Boolean(errors.details)} aria-describedby={`quote-details-help${errors.details ? " quote-details-error" : ""}`} />
                {errors.details && <p id="quote-details-error" className="contact-error">{errors.details}</p>}
              </div>
            </div>
            <button className="button button-dark contact-submit" type="submit">Préparer mon message</button>
          </form>
          {message && <div className="contact-preview">
            <h3 ref={previewHeadingRef} tabIndex={-1} id="quote-preview-title">Votre message est prêt à être vérifié.</h3>
            <label htmlFor="quote-preview">Message prérempli</label>
            <textarea id="quote-preview" rows={8} value={message} readOnly aria-describedby="quote-preview-help" />
            <p id="quote-preview-help" className="contact-help">Relisez le texte, puis testez la confirmation. Aucun message ne sera envoyé.</p>
            <button className="button button-dark" type="button" onClick={() => setSimulated(true)}>Simuler l’envoi</button>
            <p role="status" className={simulated ? "contact-help" : "sr-only"}>{simulated ? "Simulation terminée. Aucun message n’a été envoyé." : ""}</p>
          </div>}
        </div>
      </div>
    </section>
  );
}
