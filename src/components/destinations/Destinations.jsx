import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import JobOffer from '../joboffer/JobOffer';
import { COUNTRY_OFFERS } from '../../data/joboffers';
import { X } from 'lucide-react';

// "Available Opportunities" — country cards with Read More modals (work-in-the-eu page).
export default function Destinations() {
  const [modal, setModal] = useState(null); // 'poland' | 'slovakia' | 'serbia'
  const keys = ['poland', 'slovakia', 'serbia'];

  return (
    <section className="destinations" data-component="destinations">
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
                <button type="button" className="btn btn-outline" onClick={() => setModal(k)}>Read More</button>
              </div>
            );
          })}
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)} role="dialog" aria-modal="true" aria-label={`${COUNTRY_OFFERS[modal].country} job offer`}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="Close" onClick={() => setModal(null)}>
              <X size={20} />
            </button>
            <div className="modal-body">
              <JobOffer offer={COUNTRY_OFFERS[modal]} embedded />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
