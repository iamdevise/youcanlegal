import JobOffer from '../components/joboffer/JobOffer';
import ApplyForm from '../components/apply/ApplyForm';
import Numbers from '../components/numbers/Numbers';
import Testimonials from '../components/testimonials/Testimonials';
import Team from '../components/team/Team';
import Faq from '../components/faq/Faq';
import SeoCopy from '../components/seocopy/SeoCopy';
import { useApplyModal } from '../components/apply/ApplyModalHost';
import { COUNTRY_OFFERS } from '../data/joboffers';
import { offerChips } from '../lib/offerNotice';
import { COUNTRY_FAQ } from '../data/team';

// Shared template for /work-in-poland|slovakia|serbia/
// The hero uses the clean navy-to-blue theme gradient (no background photo and
// no ghost headline text), and "Apply Now" opens the modal with this country's
// program pre-selected.
export default function CountryPage({ countryKey }) {
  const offer = COUNTRY_OFFERS[countryKey];
  const faqItems = COUNTRY_FAQ[countryKey];
  const { openApply } = useApplyModal();
  const program = offer.program || `Work in ${offer.country}`;
  const chips = offerChips(offer);

  return (
    <>
      <section className="page-hero" data-component="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Genuine Job Offers, Visa Guidance, and Step-by-Step Support</span>
          <h1>{offer.heroTitle}</h1>
          <p className="subtitle">{offer.tagline}</p>
          {/* No number yet for this program (e.g. new seasonal offers) → no stat. */}
          {offer.clientsStat ? (
            <div className="hero-stats">
              <div>
                <div className="hero-stat-value">{offer.clientsStat}</div>
                <div className="hero-stat-label">
                  Happy
                  <br />
                  Clients
                </div>
              </div>
            </div>
          ) : null}
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => openApply(program)}>
              Apply Now
            </button>
            {offer.videoId ? (
              <a href="#video" className="btn btn-outline-white">
                Watch the video to see how it works
              </a>
            ) : null}
          </div>
          {/* Chips follow the offer's sponsorship/paid data (lib/offerNotice.js). */}
          {chips.length > 0 && (
            <div className="important-chips">
              {chips.map((chip) => (
                <span className="chip" key={chip}>{chip}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* the original embeds the country video right after the hero; offers with
          no video yet (e.g. the seasonal programs) show no band at all */}
      {offer.videoId ? (
        <div id="video" className="video-band">
          <div className="container">
            <div className="job-offer-video" style={{ maxWidth: 860, margin: '0 auto' }}>
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${offer.videoId}`}
                  title={offer.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <JobOffer offer={offer} onApply={() => openApply(program)} />
      <ApplyForm program={program} />
      <Numbers />
      <Testimonials />
      <Team />
      <Faq items={faqItems} />
      <SeoCopy {...offer.seo} />
    </>
  );
}
