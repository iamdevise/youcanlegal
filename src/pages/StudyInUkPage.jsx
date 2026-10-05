import { useEffect, useState } from 'react';

// /study-in-the-uk/ — Coming Soon countdown (original target: launch announcement).
export default function StudyInUkPage() {
  // Original page showed a rolling countdown to launch; we compute to a fixed
  // launch date 60 days out so the page is always meaningful.
  const [target] = useState(() => Date.now() + 60 * 24 * 3600 * 1000);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return (
    <div className="coming-soon" data-component="coming-soon">
      <img src="/assets/images/logo.png" alt="You Can Legal" />
      <h1>We are Coming Soon</h1>
      <p>Study in the UK programs are being prepared. Leave your email on our Work in the EU page — we will keep you updated.</p>
      <div className="countdown" role="timer" aria-label="Time until launch">
        <div className="count-cell"><b>{String(h).padStart(2, '0')}</b><span>Hours</span></div>
        <div className="count-cell"><b>{String(m).padStart(2, '0')}</b><span>Minutes</span></div>
        <div className="count-cell"><b>{String(s).padStart(2, '0')}</b><span>Seconds</span></div>
      </div>
    </div>
  );
}
