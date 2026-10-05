import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Sticky header — logo, anchor nav (Home/Services/Facts/Testimonials/Team/Contacts), Apply CTA, mobile menu.
// "Services/Facts/Testimonials/Team" are homepage anchors; on inner pages they link home first.
export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const anchors = [
    { label: 'Home', to: isHome ? '#top' : '/' },
    { label: 'Services', to: isHome ? '#serv' : '/#serv' },
    { label: 'Facts', to: isHome ? '#facts' : '/#facts' },
    { label: 'Testimonials', to: isHome ? '#testimonials' : '/#testimonials' },
    { label: 'Team', to: isHome ? '#team' : '/#team' },
    { label: 'Contacts', to: isHome ? '#contacts' : '/#contacts' },
  ];

  return (
    <header className="site-header" data-component="site-header">
      <div className="header-inner">
        <Link to="/" className="header-logo" aria-label="You Can Legal — home">
          <img src="/assets/images/logo.png" alt="You Can Legal" />
        </Link>
        <nav className="header-nav" aria-label="Primary">
          {anchors.map((a) => (
            <a key={a.label} href={a.to}>{a.label}</a>
          ))}
        </nav>
        <div className="header-cta">
          <Link to="/work-in-the-eu/#formform" className="btn btn-primary">Apply Now</Link>
          <button
            className="hamburger"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-nav">
          <ul>
            {anchors.map((a) => (
              <li key={a.label}>
                <a href={a.to} onClick={() => setOpen(false)}>{a.label}</a>
              </li>
            ))}
            <li>
              <Link to="/work-in-the-eu/#formform" onClick={() => setOpen(false)} style={{ color: 'var(--color-primary)' }}>
                Apply Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
