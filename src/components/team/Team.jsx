import { useCallback, useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { TEAM } from '../../data/team';

// "professionals in their field" / Our Team — the original's carousel of all 27
// real team members in the original order. Large rounded photo, name and role in
// white at the bottom-left over a soft dark gradient, and a white rounded "in"
// button at the top-left for the members who have a LinkedIn profile (the
// original only links three of them). Swipeable on phones; the original's small
// rounded-square pagination dots, active one filled blue.

export default function Team() {
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const stepSize = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.querySelector('.team-slide');
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const step = stepSize();
    if (!step) return;
    const idx = Math.min(TEAM.length - 1, Math.max(0, Math.round(el.scrollLeft / step)));
    setActiveIdx((prev) => (prev === idx ? prev : idx));
  };

  const goTo = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.min(TEAM.length - 1, Math.max(0, index));
    el.scrollTo({ left: clamped * stepSize(), behavior: 'smooth' });
  };

  // Keep the active dot in sync when the layout changes.
  useEffect(() => {
    const onResize = () => goTo(activeIdx);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  return (
    <section className="team" id="team" data-component="team-carousel">
      <div className="container">
        <SectionHeading eyebrow="professionals in their field" title="Our Team" />

        <div className="team-track" ref={trackRef} onScroll={handleScroll}>
          {TEAM.map((member) => (
            <figure className="team-slide" key={member.name}>
              <div className="team-photo">
                <img src={member.photo} alt={member.name} loading="lazy" />
                {member.linkedin && (
                  <a
                    className="team-linkedin"
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                <figcaption className="team-caption">
                  <span className="team-name">{member.name}</span>
                  <span className="team-role">{member.role}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="carousel-dots team-dots" role="tablist" aria-label="Team pagination">
          {TEAM.map((member, i) => (
            <button
              key={member.name}
              type="button"
              role="tab"
              aria-selected={i === activeIdx}
              className={`carousel-dot${i === activeIdx ? ' is-active' : ''}`}
              aria-label={`Go to team member ${i + 1} of ${TEAM.length}: ${member.name}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
