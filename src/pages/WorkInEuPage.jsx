import Destinations from '../components/destinations/Destinations';
import ApplyForm from '../components/apply/ApplyForm';
import Numbers from '../components/numbers/Numbers';
import Testimonials from '../components/testimonials/Testimonials';
import Team from '../components/team/Team';
import SeoCopy from '../components/seocopy/SeoCopy';
import Faq from '../components/faq/Faq';
import { useApplyModal } from '../components/apply/ApplyModalHost';
import { EU_OFFERS } from '../data/joboffers';
import { COUNTRY_FAQ } from '../data/team';

// /work-in-the-eu/ — hero, video + opportunity cards with modals, form, facts, social proof.
// The hero uses a clean navy-to-blue theme gradient: no background photo and no
// ghost headline text behind the stats.
export default function WorkInEuPage() {
  const { openApply } = useApplyModal();

  return (
    <>
      <section className="page-hero" data-component="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Genuine Job Offers, Visa Guidance, and Step-by-Step Support</span>
          <h1>{EU_OFFERS.heroTitle}</h1>
          <p className="subtitle">Official job offers and work permits from verified employers in Poland, Slovakia and Serbia.</p>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">{EU_OFFERS.clientsStat}</div>
              <div className="hero-stat-label">
                Happy
                <br />
                Clients
              </div>
            </div>
          </div>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => openApply('Work in the EU')}>
              Apply Now
            </button>
            <a href="#video" className="btn btn-outline-white">
              Watch the video to see how it works
            </a>
          </div>
        </div>
      </section>

      <Destinations />

      <div id="video" className="video-band">
        <div className="container">
          <div className="job-offer-video" style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${EU_OFFERS.videoId}`}
                title={EU_OFFERS.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      <ApplyForm program="Work in the EU" />
      <Numbers />
      <Testimonials />
      <Team />
      <Faq items={COUNTRY_FAQ.eu} />

      <SeoCopy
        h1="Work in Europe — Job Placement with Full Support"
        intro="Work in Europe is a realistic goal when the process is structured and transparent. Our company helps candidates access verified job opportunities in Poland, Slovakia, and Serbia, with official employment documents and step-by-step guidance."
        sections={[
          {
            h2: 'How We Work',
            p: 'We cooperate with verified employers who provide official job offers, work permits, and in most cases accommodation. Every condition — salary, schedule, housing, and costs — is explained before you commit to anything.',
            items: [
              'Verified employers and official documents',
              'Clear conditions explained in advance',
              'Accommodation arranged for most positions',
              'Support from application to arrival',
            ],
          },
          {
            h2: 'Available Countries',
            p: 'Each destination has its own contract type, permit duration, and requirements. Choose the country that fits your goals and submit your application — our team will guide you through the rest.',
            items: ['Poland — work contract up to 3 years', 'Slovakia — 2-year residence permit', 'Serbia — work visa type D + residence permit for 3 years'],
          },
          {
            h2: 'Start Your Application',
            p: 'Fill out the application form on this page to receive a free consultation. We will review your situation, explain the available options, and guide you through every step — from documents to your first working day in Europe.',
          },
        ]}
      />
    </>
  );
}
