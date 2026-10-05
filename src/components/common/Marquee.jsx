import { Fragment } from 'react';

// Infinite marquee ticker — the original's looping text band
// ("Work in the EU + Study in the UK +"), which sits between the hero and the
// services section on the home page. The chunk list is duplicated so the
// translateX(-50%) loop is seamless.
export default function Marquee({ text, alt, variant = 'blue', plus = true }) {
  const words = [text, alt].filter(Boolean);
  const chunk = (key) => (
    <div className="marquee-chunk" aria-hidden={key === 'b' ? 'true' : undefined}>
      {[0, 1, 2, 3].map((i) => (
        <Fragment key={i}>
          {words.map((word, j) => (
            <span key={j}>{word}</span>
          ))}
          {plus && <span className="plus" />}
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${variant === 'navy' ? 'marquee-marine' : ''}`} data-component="marquee" role="presentation">
      <div className="marquee-track">
        {chunk('a')}
        {chunk('b')}
      </div>
    </div>
  );
}
