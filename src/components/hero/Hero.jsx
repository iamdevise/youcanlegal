import { useApplyModal } from '../apply/ApplyModalHost';

// Homepage hero — headline, stats, CTA and the owner's hero portrait.
// The portrait is the real brand asset (man.png), not the video thumbnail, so
// no ghost text ("Who We Are? / Watch now") appears behind the headline.
export default function Hero() {
  const { openApply } = useApplyModal();

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
              <div className="hero-stat-label">
                Happy
                <br />
                Clients
              </div>
            </div>
            <div>
              <div className="hero-stat-value">175+</div>
              <div className="hero-stat-label">
                Successful
                <br />
                Cases
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => openApply('Work in the EU')}>
            Explore Opportunities
          </button>
        </div>
        <div className="hero-media">
          <img src="/assets/images/hero-portrait.png" alt="People who moved abroad to work and study legally" />
        </div>
      </div>
    </section>
  );
}
