import SectionHeading from '../common/SectionHeading';

// Escrow (PayKeeper) section — 4-step explanation (copy from original site).
export default function Escrow() {
  return (
    <section className="escrow" data-component="escrow">
      <div className="container">
        <SectionHeading eyebrow="Core advantage" title="Secure Payment via Escrow (PayKeeper)" />
        <p className="escrow-intro">
          We offer payment through Escrow service{' '}
          <a href="https://paykeeper.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-ice)', fontWeight: 600 }}>
            PayKeeper.com
          </a>{' '}
          — for clients who want maximum security and full transparency. With Escrow, you don’t pay us directly.
          Your payment is held by an independent third party and released only after the work is completed and confirmed.
        </p>
        <div className="escrow-grid">
          <div className="escrow-step"><span className="escrow-step-num">01</span><p>You send the payment to PayKeeper</p></div>
          <div className="escrow-step"><span className="escrow-step-num">02</span><p>PayKeeper safely holds the funds</p></div>
          <div className="escrow-step"><span className="escrow-step-num">03</span><p>We complete the work</p></div>
          <div className="escrow-step"><span className="escrow-step-num">04</span><p>Funds are released only after confirmation</p></div>
        </div>
        <p className="escrow-note">This means your money is protected by a neutral financial service — not by us.</p>
      </div>
    </section>
  );
}
