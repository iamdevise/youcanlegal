import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

// Homepage hero — headline, stats, CTA, portrait card with escrow badge.
export default function Hero() {
  return (
    <section className="hero" id="top" data-component="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">We Help People Change Their Lives</span>
          <h1 className="hero-title">
            Study. Work. Live Abroad — <span className="accent-italic">Legally.</span>
          </h1>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">700+</div>
              <div className="hero-stat-label">Happy<br />Clients</div>
            </div>
            <div>
              <div className="hero-stat-value">175+</div>
              <div className="hero-stat-label">Successful<br />Cases</div>
            </div>
          </div>
          <Link to="/work-in-the-eu/" className="btn btn-primary">Explore Opportunities</Link>
        </div>
        <div className="hero-media">
          <img src="/assets/images/hero-eu.jpg" alt="You Can Legal — relocation support" />
          <div className="hero-badge">
            <span className="hero-badge-icon"><ShieldCheck size={24} /></span>
            <span>
              <strong>Funds secured</strong>
              <span>until documents are delivered</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
