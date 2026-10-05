import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';

// "Our services" — two big cards (Work in the EU / Study in the UK).
export default function Services() {
  return (
    <section className="services" id="serv" data-component="services-grid">
      <div className="container">
        <SectionHeading eyebrow="Choose your future" title="Our services" />
        <div className="services-grid">
          <div className="service-card">
            <img src="/assets/images/hero-eu.jpg" alt="Work in the EU" loading="lazy" />
            <div className="service-card-body">
              <h3>Work in the EU</h3>
              <p>Official job offers with work permits in Poland, Slovakia and Serbia — verified employers, full document support.</p>
              <Link to="/work-in-the-eu/" className="btn btn-white">Explore Jobs</Link>
            </div>
          </div>
          <div className="service-card">
            <img src="/assets/images/hero-slovakia.jpg" alt="Study in the UK" loading="lazy" />
            <div className="service-card-body">
              <h3>Study in the UK</h3>
              <p>Education opportunities in Europe. This direction is being prepared — coming soon.</p>
              <Link to="/study-in-the-uk/" className="btn btn-white">Learn More</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
