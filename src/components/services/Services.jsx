import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';

// "Choose your future" / Our services — the original's two large photo cards:
// tall portrait shape, ~30px rounded corners, full bleed photo under a dark
// blue overlay, big centered white title, and a translucent rounded-square
// arrow button below the title. The photos are the original card backgrounds,
// downloaded into public/assets/images/services/.

// The arrow is the original theme's read-more glyph (18x16).
function ArrowIcon() {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7.99999C0 7.70162 0.118527 7.41547 0.329505 7.20449C0.540484 6.99351 0.826631 6.87499 1.125 6.87499H14.1593L9.3285 2.04649C9.11726 1.83524 8.99858 1.54873 8.99858 1.24999C8.99858 0.951242 9.11726 0.664732 9.3285 0.453487C9.53974 0.242242 9.82625 0.123566 10.125 0.123566C10.4237 0.123566 10.7103 0.242242 10.9215 0.453487L17.6715 7.20349C17.7763 7.30799 17.8594 7.43213 17.9161 7.56881C17.9728 7.70549 18.002 7.85201 18.002 7.99999C18.002 8.14796 17.9728 8.29449 17.9161 8.43116C17.8594 8.56784 17.7763 8.69199 17.6715 8.79649L10.9215 15.5465C10.7103 15.7577 10.4237 15.8764 10.125 15.8764C9.82625 15.8764 9.53974 15.7577 9.3285 15.5465C9.11726 15.3352 8.99858 15.0487 8.99858 14.75C8.99858 14.4512 9.11726 14.1647 9.3285 13.9535L14.1593 9.12499H1.125C0.826631 9.12499 0.540484 9.00646 0.329505 8.79548C0.118527 8.58451 0 8.29836 0 7.99999Z"
      />
    </svg>
  );
}

const CARDS = [
  {
    // Straight to the Available Opportunities cards, not the top of the page.
    to: '/work-in-the-eu/#opportunities',
    title: 'Work in the EU',
    image: '/assets/images/services/eu-work.jpg',
    alt: 'Smiling worker in a navy cap and hi-vis vest in front of the European Union flag',
  },
  {
    to: '/study-in-the-uk/',
    title: 'Study in the UK',
    image: '/assets/images/services/uk-study.jpg',
    alt: 'Smiling young man holding a UK flag and books on a mustard yellow background',
  },
];

export default function Services() {
  return (
    <section className="services" id="serv" data-component="services-grid">
      <div className="container">
        <SectionHeading eyebrow="Choose your future" title="Our services" />
        <div className="services-grid">
          {CARDS.map((card) => (
            <Link className="service-card" to={card.to} key={card.to}>
              <img className="service-photo" src={card.image} alt={card.alt} loading="lazy" />
              <span className="service-scrim" aria-hidden="true" />
              <span className="service-card-body">
                <span className="service-title">{card.title}</span>
                <span className="service-arrow">
                  <ArrowIcon />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
