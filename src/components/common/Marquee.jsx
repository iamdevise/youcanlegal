// Infinite marquee ticker — replicates the Elementor text-path scroll.
// Duplicates the chunk list so translateX(-50%) loops seamlessly.
export default function Marquee({ text, variant = 'blue', plus = true }) {
  const chunk = (key) => (
    <div className="marquee-chunk" aria-hidden={key === 'b' ? 'true' : undefined}>
      <span>{text}</span>
      {plus && <span className="plus" />}
      <span>{text}</span>
      {plus && <span className="plus" />}
      <span>{text}</span>
      {plus && <span className="plus" />}
      <span>{text}</span>
      {plus && <span className="plus" />}
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
