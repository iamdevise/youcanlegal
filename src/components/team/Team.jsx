import { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TEAM } from '../../data/team';

// Team carousel — 27 members, paginated like the original (1..27 pages, 4 per view desktop).
export default function Team() {
  const [page, setPage] = useState(0);
  const per = 4;
  const maxPage = Math.ceil(TEAM.length / per) - 1;
  const shift = page * 100;

  return (
    <section className="team" id="team" data-component="team-carousel">
      <div className="container">
        <SectionHeading eyebrow="professionals in their field" title="Our Team" />
        <div className="team-viewport">
          <div className="team-track" style={{ transform: `translateX(-${shift}%)` }}>
            {TEAM.map((m, i) => (
              <figure className="team-card" key={m.name + i}>
                <img src={m.photo} alt={m.name} loading="lazy" />
                <figcaption className="team-meta">
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="carousel-nav">
          <button type="button" className="carousel-btn" aria-label="Previous team page" disabled={page === 0} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="carousel-btn" aria-label="Next team page" disabled={page >= maxPage} onClick={() => setPage(page + 1)}>
            <ChevronRight size={20} />
          </button>
        </div>
        <nav className="team-pager" aria-label="Team pages">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === page ? 'active' : ''}
              aria-label={`Go to team page ${i + 1}`}
              aria-current={i === page ? 'page' : undefined}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
