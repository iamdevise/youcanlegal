import { useParams } from 'react-router-dom';
import Marquee from '../components/common/Marquee';
import JobOffer from '../components/joboffer/JobOffer';
import ApplyForm from '../components/apply/ApplyForm';
import Numbers from '../components/numbers/Numbers';
import Escrow from '../components/escrow/Escrow';
import Testimonials from '../components/testimonials/Testimonials';
import Team from '../components/team/Team';
import Faq from '../components/faq/Faq';
import SeoCopy from '../components/seocopy/SeoCopy';
import { COUNTRY_OFFERS } from '../../data/joboffers';
import { COUNTRY_FAQ } from '../data/team';

// Shared template for /work-in-poland|slovakia|serbia/
export default function CountryPage({ countryKey }) {
  const offer = COUNTRY_OFFERS[countryKey];
  const faqItems = COUNTRY_FAQ[countryKey];

  return (
    <>
      <section className="page-hero" data-component="page-hero">
        <img src={offer.heroImage} alt="" />
        <div className="page-hero-inner">
          <span className="eyebrow">Genuine Job Offers, Visa Guidance, and Step-by-Step Support</span>
          <h1>{offer.heroTitle}</h1>
          <p className="subtitle">{offer.tagline}</p>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">{offer.clientsStat}</div>
              <div className="hero-stat-label">Happy<br />Clients</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 30, flexWrap: 'wrap' }}>
            <a href="#formform" className="btn btn-primary">Apply Now</a>
          </div>
          <div className="important-chips">
            <span className="chip">No sponsorship provided</span>
            <span className="chip">All programs are paid</span>
          </div>
        </div>
        </section>

      <Marquee text="Funds secured until documents are delivered" variant="navy" plus={false} />

      <JobOffer offer={offer} />
      <ApplyForm program={`Work in ${offer.country}`} />
      <Numbers />
      <Escrow />
      <Testimonials />
      <Team />
      <Faq items={faqItems} />
      <SeoCopy {...offer.seo} />
    </>
  );
}
