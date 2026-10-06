import { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import JobOffer from '../joboffer/JobOffer';
import { COUNTRY_OFFERS } from '../../data/joboffers';
import { useApplyModal } from '../apply/ApplyModalHost';
import { X } from 'lucide-react';

// "Available Opportunities" — pale blue tinted cards, flag left-aligned inside
// the card, country name, one-line description and a solid blue "Read More".
// Used on the Work in the EU page; the same cards open the country offers.
//
// This section carries id="opportunities", which every "Work in the EU" link on
// the site targets, so visitors land straight on these three cards.
//
// The Apply button inside the Read More popup opens the application popup on top
// with that country's program pre-selected; closing it returns to the job offer
// because this popup stays mounted underneath.

export default function Destinations() {
  const [modal, setModal] = useState(null); // 'poland' | 'slovakia' | 'serbia'
  const { openApply } = useApplyModal();
  const keys = ['poland', 'slovakia', 'serbia'];

  return (
    <section className="destinations" id="opportunities" data-component="destinations">
      <div className="container">
        <SectionHeading eyebrow="our destinations" title="Available Opportunities" />
        <div className="dest-grid">
          {keys.map((k) => {
            const c = COUNTRY_OFFERS[k];
            return (
              <div className="dest-card" key={k}>
                <img className="dest-flag" src={c.flag} alt={`${c.country} flag`} loading="lazy" />
                <h3>{c.country}</h3>
                <p>{c.tagline}</p>
                <button type="button" className="btn btn-primary dest-btn" onClick={() => setModal(k)}>
                  Read More
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {modal && (
        <div
          className="modal-overlay"
          onClick={() => setModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${COUNTRY_OFFERS[modal].country} job offer`}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="Close" onClick={() => setModal(null)}>
              <X size={20} />
            </button>
            <div className="modal-body">
              <JobOffer
                offer={COUNTRY_OFFERS[modal]}
                embedded
                onApply={() => openApply(`Work in ${COUNTRY_OFFERS[modal].country}`)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
