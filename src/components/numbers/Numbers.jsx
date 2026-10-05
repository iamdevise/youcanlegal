import SectionHeading from '../common/SectionHeading';
import CountUp from '../common/CountUp';

// "About in numbers" — animated counters (values from original site).
export default function Numbers() {
  return (
    <section className="numbers" id="facts" data-component="numbers">
      <div className="container">
        <SectionHeading eyebrow="our facts" title="About in numbers" />
        <div className="numbers-grid">
          <div className="number-card">
            <CountUp value={5} suffix="+" />
            <p className="number-label">years of expirience in immigration matters</p>
          </div>
          <div className="number-card">
            <CountUp value={20} suffix="+" />
            <p className="number-label">partner institutions across Europe &amp; the UK</p>
          </div>
          <div className="number-card">
            <CountUp value={12} />
            <p className="number-label">experienced employees in the company</p>
          </div>
        </div>
      </div>
    </section>
  );
}
