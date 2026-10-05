import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

// FAQ accordion — the original's style: light-blue rows with a blue border and
// 6px rounded corners, a plus/minus icon on the LEFT of the numbered question,
// the first item open by default and one item open at a time. The questions and
// answers are copied word for word from the matching original page.

// The answers are stored as the original's paragraphs and bullet lines. In the
// original a list starts after a line that ends with ":" — everything after it
// is a bullet until a line that ends a sentence.
function bulletFlags(lines) {
  const flags = [];
  let inList = false;
  lines.forEach((line, i) => {
    const text = String(line).trim();
    if (i === 0 || text.endsWith(':')) {
      inList = text.endsWith(':');
      flags.push(false);
      return;
    }
    const isBullet = inList && !/[.?!]$/.test(text);
    flags.push(isBullet);
    if (!isBullet) inList = false;
  });
  return flags;
}

export default function Faq({ items, band = true, heading = true }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section
      className="faq"
      id="faq"
      data-component="faq-accordion"
      style={band ? undefined : { background: 'var(--color-surface-tint)', paddingTop: 0 }}
    >
      <div className="container">
        {heading && <SectionHeading eyebrow="From documents to destination — we're with you!" title="FAQ" />}
        <div className="faq-list">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            const flags = bulletFlags(item.a);
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.q}>
                <h3 className="faq-h">
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  >
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                    <span className="faq-q-text">{item.q}</span>
                  </button>
                </h3>
                {isOpen && (
                  <div className="faq-a" id={`faq-panel-${i}`} role="region">
                    <div className="faq-a-inner">
                      {item.a.map((line, j) =>
                        flags[j] ? (
                          <p className="faq-bullet" key={j}>
                            {line}
                          </p>
                        ) : (
                          <p key={j}>{line}</p>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
