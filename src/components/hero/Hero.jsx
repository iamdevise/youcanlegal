import { Link } from 'react-router-dom';

// Homepage hero — headline, stats, CTA and the owner's hero portrait.
// The portrait is the real brand asset (man.png), not the video thumbnail, so
// no ghost text ("Who We Are? / Watch now") appears behind the headline.
export default function Hero() {

  return (
    <section className="hero" id="top" data-component="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">We Help People Change Their Lives</span>
          <h1 className="hero-title">
            Study. Work. Live Abroad — <span className="accent-italic">Legally.</span>
          </h1>
          {/* The original hero shows a single counter: 700+ Happy Clients. */}
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">700+</div>
              <div className="hero-stat-label">
                Happy
                <br />
                Clients
              </div>
            </div>
          </div>
          {/* Lands on the Work in the EU page, scrolled to the opportunities. */}
          <Link to="/work-in-the-eu/#opportunities" className="btn btn-primary">
            Explore Opportunities
          </Link>
        </div>
        <div className="hero-media">
          <img src="/assets/images/hero-portrait.png" alt="People who moved abroad to work and study legally" />
        </div>
      </div>
    </section>
  );
}
