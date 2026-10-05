import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// FAQ accordion — items passed per page/context.
export default function Faq({ items, band = true }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq" data-component="faq-accordion" style={band ? undefined : { background: 'var(--color-surface-tint)', paddingTop: 0 }}>
      <div className="container">
        <div className="faq-list">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.q}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                >
                  {item.q}
                  <span className="chev"><ChevronDown size={17} /></span>
                </button>
                <div className="faq-a" id={`faq-panel-${i}`} role="region">
                  <div className="faq-a-inner">
                    {item.a.map((line, j) => {
                      const bullet = !line.endsWith(':') && !line.endsWith('.');
                      return bullet && j > 0 && item.a[j - 1].length > 0 && !item.a[j - 1].endsWith('.') ? (
                        <div key={j} style={{ paddingLeft: 0 }}>{line}</div>
                      ) : (
                        <p key={j} style={{ marginBottom: 6 }}>{line}</p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
