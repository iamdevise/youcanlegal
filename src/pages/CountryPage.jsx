import JobOffer from '../components/joboffer/JobOffer';
import ApplyForm from '../components/apply/ApplyForm';
import Numbers from '../components/numbers/Numbers';
import Testimonials from '../components/testimonials/Testimonials';
import Team from '../components/team/Team';
import Faq from '../components/faq/Faq';
import SeoCopy from '../components/seocopy/SeoCopy';
import { useApplyModal } from '../components/apply/ApplyModalHost';
import { COUNTRY_OFFERS } from '../data/joboffers';
import { COUNTRY_FAQ } from '../data/team';

// Shared template for /work-in-poland|slovakia|serbia/
// The hero uses the clean navy-to-blue theme gradient (no background photo and
// no ghost headline text), and "Apply Now" opens the modal with this country's
// program pre-selected.
export default function CountryPage({ countryKey }) {
  const offer = COUNTRY_OFFERS[countryKey];
  const faqItems = COUNTRY_FAQ[countryKey];
  const { openApply } = useApplyModal();
  const program = `Work in ${offer.country}`;

  return (
    <>
      <section className="page-hero" data-component="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Genuine Job Offers, Visa Guidance, and Step-by-Step Support</span>
          <h1>{offer.heroTitle}</h1>
          <p className="subtitle">{offer.tagline}</p>
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
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => openApply(program)}>
              Apply Now
            </button>
            <a href="#video" className="btn btn-outline-white">
              Watch the video to see how it works
            </a>
          </div>
          <div className="important-chips">
            <span className="chip">No sponsorship provided</span>
            <span className="chip">All programs are paid</span>
          </div>
        </div>
      </section>

      {/* the original embeds the country video right after the hero */}
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

      <JobOffer offer={offer} />
      <ApplyForm program={program} />
      <Numbers />
      <Testimonials />
      <Team />
      <Faq items={faqItems} />
      <SeoCopy {...offer.seo} />
    </>
  );
}
