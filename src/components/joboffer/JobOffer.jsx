import ApplyButton from '../apply/ApplyButton';

// Renders the structured job-offer blocks for a country (data-driven from joboffers.js).
//
// `onApply` adds the Apply Now button after the last block. When the offer is
// shown inside the Read More popup (`embedded`), a sticky bar is added as well so
// the button is always in view without scrolling to the end.
export default function JobOffer({ offer, embedded = false, onApply }) {
  return (
    <section className="job-offer" data-component="job-offer" style={embedded ? { padding: '10px 0 0' } : undefined}>
      <div className="container" style={embedded ? { padding: 0 } : undefined}>
        {offer.sections.map((sec) => (
          <div key={sec.h} className="job-offer-grid" style={{ marginBottom: 40, ...(embedded ? { gridTemplateColumns: '1fr', gap: 20 } : null) }}>
            <div className="job-offer-video" style={embedded ? { display: 'none' } : undefined}>
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${offer.videoId}`}
                  title={offer.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
            <div className="job-offer-content">
              <h3>{sec.h}</h3>
              {sec.blocks.map((b, i) => {
                if (b.type === 'kv') {
                  return (
                    <p key={i}><strong>{b.label}:</strong> {b.text || ''}</p>
                  );
                }
                if (b.type === 'kvlist') {
                  return (
                    <div key={i}>
                      <p><strong>{b.label}:</strong></p>
                      <ul>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                    </div>
                  );
                }
                if (b.type === 'p') {
                  return <p key={i} style={b.strong ? { fontWeight: 600, color: 'var(--color-ink-heading)' } : undefined}>{b.text}</p>;
                }
                if (b.type === 'h4') {
                  return <h4 key={i}>{b.text}</h4>;
                }
                if (b.type === 'list') {
                  return (
                    <div key={i}>
                      {b.title && <p><strong>{b.title}:</strong></p>}
                      <ul>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                    </div>
                  );
                }
                if (b.type === 'steps') {
                  return (
                    <ol key={i} className="steps">
                      {b.items.map((it, j) => (
                        <li key={j} style={{ marginBottom: 6 }}>{j + 1}. {it}</li>
                      ))}
                    </ol>
                  );
                }
                // Payment/price callouts are intentionally not rendered — the
                // owner manages all payment content outside this site.
                return null;
              })}
              <div className="notice-inline">
                <strong>Important:</strong> No sponsorship provided · All programs are paid
              </div>

              {/* Apply at the end of the offer — full-page offers only. In the
                  Read More popup the sticky bar below is the single Apply button,
                  so the two can never appear stacked. */}
              {onApply && !embedded && (
                <div className="job-offer-apply">
                  <ApplyButton onClick={onApply} />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Sticky Apply bar inside the Read More popup */}
        {embedded && onApply && (
          <div className="job-offer-sticky">
            <ApplyButton onClick={onApply} />
          </div>
        )}
      </div>
    </section>
  );
}
