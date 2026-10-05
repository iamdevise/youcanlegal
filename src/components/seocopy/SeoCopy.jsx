import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Collapsible SEO copy block — "Expand ▼" pattern from original site.
// Props: h1, intro, p2, sections [{h2, p, p2, h3, items}], defaultOpen
export default function SeoCopy({ h1, intro, p2, sections = [], defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="seo-copy" data-component="seo-copy">
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.9rem', color: 'var(--color-ink-heading)', marginBottom: 14 }}>{h1}</h1>
        <p>{intro}</p>
        {p2 && <p>{p2}</p>}
        <div style={{ display: open ? 'block' : 'none' }}>
          {sections.map((s, i) => (
            <div key={i}>
              <h2>{s.h2}</h2>
              {s.p && <p>{s.p}</p>}
              {s.items && (
                <ul>
                  {s.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              )}
              {s.p2 && <p>{s.p2}</p>}
              {s.h3 && <h3>{s.h3}</h3>}
              {s.items2 && (
                <ul>
                  {s.items2.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
        {sections.length > 0 && (
          <button type="button" className={`expand-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? 'Collapse ▲' : 'Expand ▼'}
            <span className="chev"><ChevronDown size={16} /></span>
          </button>
        )}
      </div>
    </section>
  );
}
