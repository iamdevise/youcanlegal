// ---------------------------------------------------------------------------
// Sponsorship / paid notices — the single source of truth for every place the
// site shows "No sponsorship provided · All programs are paid" or its variants.
//
// An offer's data decides the wording:
//   sponsorship: 'none'     → the current wording (no sponsorship notice that is)
//   sponsorship: 'included' → uses offer.sponsorshipNote ("Sponsorship included" …)
//   sponsorship: null/missing → no sponsorship notice at all
//   paid: true (default)    → appends "All programs are paid"
//   paid: false             → the "paid" part is dropped everywhere
//
// The returned strings feed three surfaces:
//   notice     — the inline notice under a job offer ("Important: …")
//   chips      — the hero chips on a country page
//   consentText— the second consent checkbox in the application form
// The consent keys (fees / service / contact) never change.
// ---------------------------------------------------------------------------

const PAID_PART = 'All programs are paid';

function paidSuffix(offer) {
  return offer?.paid === false ? '' : PAID_PART;
}

function joinParts(parts) {
  return parts.filter(Boolean).join(' · ');
}

/** The "Important:" inline notice shown under a job offer. '' when there is nothing to say. */
export function offerNotice(offer) {
  const parts = [];
  if (offer?.sponsorship === 'none') parts.push('No sponsorship provided');
  if (offer?.sponsorship === 'included') parts.push(offer.sponsorshipNote || 'Sponsorship included');
  const suffix = paidSuffix(offer);
  if (suffix) parts.push(suffix);
  if (parts.length === 0) return '';
  return `Important: ${joinParts(parts)}`;
}

/** The hero chips on a country page. [] when there is nothing to show. */
export function offerChips(offer) {
  const chips = [];
  if (offer?.sponsorship === 'none') chips.push('No sponsorship provided');
  if (offer?.sponsorship === 'included') chips.push(offer.sponsorshipNote || 'Sponsorship included');
  const suffix = paidSuffix(offer);
  if (suffix) chips.push(suffix);
  return chips;
}

/**
 * The second consent checkbox in the application form.
 * - sponsorship 'none' (or unknown program) → today's exact wording
 * - 'included' → must not claim sponsorship is missing; neutral instead
 * - null → neutral, no sponsorship claim either way
 */
export function offerConsentText(offer) {
  const authorities = 'the final visa decision is made by the relevant immigration authorities';
  if (offer?.sponsorship === 'none') {
    return `I understand that the company provides paid guidance and support, including employment documents and a work permit. Visa sponsorship is not included, and ${authorities}.`;
  }
  if (offer?.sponsorship === 'included') {
    return `I understand that the company provides paid guidance and support, including employment documents and a work permit, and that ${authorities}.`;
  }
  return `I understand that the company provides paid guidance and support, including employment documents and a work permit, and that ${authorities}.`;
}

/** The small line under the consent checkboxes. '' when there is nothing to say. */
export function offerFootnote(offer) {
  const parts = [];
  if (offer?.sponsorship === 'none') parts.push('No sponsorship provided');
  if (offer?.sponsorship === 'included') parts.push(offer.sponsorshipNote || 'Sponsorship included');
  const suffix = paidSuffix(offer);
  if (suffix) parts.push(suffix);
  return joinParts(parts);
}

/** Find the offer a program name belongs to ('Work in Poland' → the poland offer). */
export function offerByProgram(program, offers) {
  const name = String(program || '').trim();
  if (!name) return undefined;
  return Object.values(offers || {}).find((o) => o && o.program === name);
}
