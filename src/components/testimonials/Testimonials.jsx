import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { TESTIMONIALS, embedUrl, posterUrl } from '../../data/testimonials';

// "proof of our work" / Testimonials — the original's carousel of YouTube video
// testimonials (26 videos, same order). Each slide shows the real YouTube
// thumbnail and a red play button; the iframe is only created on tap, so the
// page stays fast with 26 videos. Videos use youtube-nocookie.com with autoplay,
// exactly like the original. A playing video is stopped when the slide changes.

// Desktop shows the original's 3 slides, phones show 1.
function perView() {
  if (typeof window === 'undefined') return 3;
  return window.innerWidth <= 767 ? 1 : 3;
}

function Slide({ video, isPlaying, onPlay }) {
  return (
    <figure className="video-slide">
      {isPlaying ? (
        <iframe
          src={embedUrl(video.id)}
          title={video.title}
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" className="yt-lite" onClick={onPlay} aria-label={`Play video: ${video.title}`}>
          <img src={posterUrl(video.id)} alt={video.title} loading="lazy" />
          <span className="yt-lite-play" aria-hidden="true" />
        </button>
      )}
    </figure>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [playingId, setPlayingId] = useState(null);
  const [per, setPer] = useState(perView);

  useEffect(() => {
    const onResize = () => setPer(perView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Stop a playing video whenever the visible slide changes.
  useEffect(() => {
    setPlayingId(null);
  }, [activeIdx]);

  const stepSize = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.querySelector('.video-slide');
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const step = stepSize();
    if (!step) return;
    const idx = Math.min(TESTIMONIALS.length - 1, Math.max(0, Math.round(el.scrollLeft / step)));
    setActiveIdx((prev) => (prev === idx ? prev : idx));
  };

  const goTo = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.min(TESTIMONIALS.length - 1, Math.max(0, index));
    el.scrollTo({ left: clamped * stepSize(), behavior: 'smooth' });
  };

  return (
    <section className="testimonials" id="testimonials" data-component="testimonials">
      <div className="container">
        <SectionHeading eyebrow="proof of our work" title="Testimonials" />

        <div className="video-carousel">
          <div className="video-track" ref={trackRef} onScroll={handleScroll}>
            {TESTIMONIALS.map((video) => (
              <Slide key={video.id} video={video} isPlaying={playingId === video.id} onPlay={() => setPlayingId(video.id)} />
            ))}
          </div>

          <div className="carousel-nav video-arrows">
            <button type="button" className="carousel-btn" aria-label="Previous testimonials" onClick={() => goTo(activeIdx - 1)}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" className="carousel-btn" aria-label="Next testimonials" onClick={() => goTo(activeIdx + 1)}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="carousel-dots" role="tablist" aria-label="Testimonial pagination">
          {TESTIMONIALS.map((video, i) => (
            <button
              key={video.id}
              type="button"
              role="tab"
              aria-selected={i === activeIdx}
              className={`carousel-dot${i === activeIdx ? ' is-active' : ''}`}
              aria-label={`Go to testimonial ${i + 1} of ${TESTIMONIALS.length}${
                i % per === 0 ? `: ${video.title}` : ''
              }`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
