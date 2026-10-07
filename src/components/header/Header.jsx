import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useApplyModal } from '../apply/ApplyModalHost';

// Sticky header — transparent over the hero, theme-tinted once scrolled.
// Never plain white: light pages use the pale blue theme tint, dark pages
// (Work in the EU + the country pages) use the deep navy.
// The logo always shows the full lockup: navy wordmark on light, white on dark.

// Pages whose hero is a dark navy band.
const DARK_ROUTES = ['/work-in-the-eu/', '/work-in-poland/', '/work-in-slovakia/', '/work-in-serbia/', '/work-in-spain/', '/work-in-italy/'];
// Pages that open with a light hero the header can sit transparently over.
const TRANSPARENT_ROUTES = ['/'];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { openApply } = useApplyModal();

  const isHome = pathname === '/';
  const isDarkPage = DARK_ROUTES.some((route) => pathname === route || pathname === route.slice(0, -1));
  const transparentTop = TRANSPARENT_ROUTES.includes(pathname) || isDarkPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Nothing is ever plain white: dark pages use navy, light pages the blue tint.
  const headerClass = [
    'site-header',
    isDarkPage ? 'site-header--dark' : 'site-header--light',
    transparentTop && !scrolled ? 'site-header--transparent' : 'site-header--solid',
    open ? 'site-header--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const anchors = [
    { label: 'Home', href: isHome ? '#top' : '/', to: '/' },
    { label: 'Services', href: isHome ? '#serv' : '/#serv', to: '/#serv' },
    { label: 'Facts', href: isHome ? '#facts' : '/#facts', to: '/#facts' },
    { label: 'Testimonials', href: isHome ? '#testimonials' : '/#testimonials', to: '/#testimonials' },
    { label: 'Team', href: isHome ? '#team' : '/#team', to: '/#team' },
    { label: 'Contacts', href: isHome ? '#contacts' : '/#contacts', to: '/#contacts' },
  ];

  const logo = isDarkPage ? '/assets/images/logo-horiz-white.svg' : '/assets/images/logo-horiz-navy.svg';

  return (
    <header className={headerClass} data-component="site-header">
      <div className="header-inner">
        <Link to="/" className="header-logo" aria-label="You Can Legal — home">
          <img src={logo} alt="You Can Legal" width="232" height="60" />
        </Link>

        <nav className="header-nav" aria-label="Primary">
          {anchors.map((a) =>
            a.href.startsWith('#') ? (
              <a key={a.label} href={a.href}>
                {a.label}
              </a>
            ) : (
              <Link key={a.label} to={a.to}>
                {a.label}
              </Link>
            )
          )}
        </nav>

        <div className="header-cta">
          <button type="button" className="btn btn-primary" onClick={() => openApply('Work in the EU')}>
            Apply Now
          </button>
          <button
            className="hamburger"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-nav"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav" id="mobile-nav">
          <ul>
            {anchors.map((a) => (
              <li key={a.label}>
                {a.href.startsWith('#') ? (
                  <a href={a.href} onClick={() => setOpen(false)}>
                    {a.label}
                  </a>
                ) : (
                  <Link to={a.to} onClick={() => setOpen(false)}>
                    {a.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <button
                type="button"
                className="mobile-nav-apply"
                onClick={() => {
                  setOpen(false);
                  openApply('Work in the EU');
                }}
              >
                Apply Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
