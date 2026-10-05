// Shared section heading: eyebrow + title (optional italic accent part).
export default function SectionHeading({ eyebrow, title, accent, centered = true, children }) {
  return (
    <div className={centered ? 'section-head' : ''}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">
        {title}
        {accent && (
          <>
            {' '}
            <span className="accent-italic">{accent}</span>
          </>
        )}
      </h2>
      {children}
    </div>
  );
}
