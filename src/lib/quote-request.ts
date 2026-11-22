export const QUOTE_SERVICES = [
  "Nettoyage de bureaux",
  "Parties communes",
  "Espaces commerciaux",
  "Nettoyage de vitres",
  "Autres prestations",
] as const;

export type QuoteRequest = {
  fullName: string;
  organization: string;
  service: string;
  locality: string;
  details: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;

export const QUOTE_LIMITS = { fullName: 100, organization: 120, locality: 120, details: 1000 };

export function normalizeQuote(values: QuoteRequest): QuoteRequest {
  const singleLine = (value: string) => value.replace(/\s+/g, " ").trim();
  return {
    fullName: singleLine(values.fullName),
    organization: singleLine(values.organization),
    service: values.service.trim(),
    locality: singleLine(values.locality),
    details: values.details.replace(/\r\n?/g, "\n").trim(),
  };
}

export function validateQuote(values: QuoteRequest): QuoteErrors {
  const quote = normalizeQuote(values);
  const errors: QuoteErrors = {};
  if (quote.fullName.length < 2 || quote.fullName.length > QUOTE_LIMITS.fullName) {
    errors.fullName = "Indiquez votre nom et prénom (2 à 100 caractères).";
  }
  if (quote.organization.length > QUOTE_LIMITS.organization) {
    errors.organization = "Limitez le nom de votre organisation à 120 caractères.";
  }
  if (!QUOTE_SERVICES.some((service) => service === quote.service)) {
    errors.service = "Sélectionnez un service dans la liste.";
  }
  if (quote.locality.length < 2 || quote.locality.length > QUOTE_LIMITS.locality) {
    errors.locality = "Indiquez la commune concernée (2 à 120 caractères).";
  }
  if (quote.details.length < 10 || quote.details.length > QUOTE_LIMITS.details) {
    errors.details = "Décrivez votre besoin en 10 à 1 000 caractères.";
  }
  return errors;
}

export function buildQuoteMessage(values: QuoteRequest): string {
  const quote = normalizeQuote(values);
  // Keep invalid or tampered service values out of the generated request.
  if (Object.keys(validateQuote(quote)).length > 0) {
    throw new Error("Cannot generate a message from an invalid quote request.");
  }
  return [
    "Bonjour BeKlean,",
    "Je souhaite obtenir un devis pour l’entretien de mes espaces.",
    "",
    `Nom : ${quote.fullName}`,
    ...(quote.organization ? [`Entreprise / organisation : ${quote.organization}`] : []),
    `Service : ${quote.service}`,
    `Commune : ${quote.locality}`,
    "",
    "Ma demande :",
    quote.details,
    "",
    "Merci pour votre retour.",
  ].join("\n");
}
