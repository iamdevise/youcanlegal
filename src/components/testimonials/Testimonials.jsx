import { useEffect, useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/team';

// Testimonials carousel — client stories (avatars are owner-supplied brand assets).
function perView() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 767) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const [per, setPer] = useState(perView);

  useEffect(() => {
    const onResize = () => setPer(perView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxPage = Math.max(0, Math.ceil(TESTIMONIALS.length / per) - 1);
  const safePage = Math.min(page, maxPage);
  const shift = safePage * (100 / per);

  return (
    <section className="testimonials" id="testimonials" data-component="testimonials">
      <div className="container">
        <SectionHeading eyebrow="proof of our work" title="Testimonials" />
        <div className="testi-viewport">
          <div className="testi-track" style={{ transform: `translateX(-${shift}%)` }}>
            {TESTIMONIALS.map((t) => (
              <figure className="testi-card" key={t.name}>
                <div className="testi-stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" strokeWidth={0} />)}
                </div>
                <blockquote className="testi-text">{t.text}</blockquote>
                <figcaption className="testi-author">
                  <img src={t.avatar} alt={t.name} loading="lazy" />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.origin}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="carousel-nav">
          <button type="button" className="carousel-btn" aria-label="Previous testimonials" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="carousel-btn" aria-label="Next testimonials" disabled={safePage >= maxPage} onClick={() => setPage(safePage + 1)}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
