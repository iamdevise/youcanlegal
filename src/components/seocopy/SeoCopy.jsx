import { useState } from 'react';

// Collapsible SEO copy — the original's "Expand ▼" pattern: the whole text block
// is clipped to 10em with a white fade overlay, and the bar below toggles between
// "Expand ▼" and "Collapse ▲" (the arrow flips).
// Props: h1, intro, p2, sections [{ h2, p, p2, h3, items, items2 }]
export default function SeoCopy({ h1, intro, p2, sections = [], defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="seo-copy" data-component="seo-copy">
      <div className="container">
        <div className={`seo-text${open ? ' open' : ''}`}>
          <h1>{h1}</h1>
          {intro && <p>{intro}</p>}
          {p2 && <p>{p2}</p>}
          {sections.map((s, i) => (
            <div key={i}>
              {s.h2 && <h2>{s.h2}</h2>}
              {s.p && <p>{s.p}</p>}
              {s.items && (
                <ul>
                  {s.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              )}
              {s.h3 && <h3>{s.h3}</h3>}
              {s.items2 && (
                <ul>
                  {s.items2.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {!open && <div className="seo-fade" aria-hidden="true" />}

        {sections.length > 0 && (
          <button type="button" className="expand-bar" onClick={() => setOpen(!open)} aria-expanded={open}>
            <span className="expand-text">{open ? 'Collapse' : 'Expand'}</span>
            <span className={`expand-icon${open ? ' open' : ''}`} aria-hidden="true">
              ▼
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
