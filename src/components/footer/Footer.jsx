import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { TikTokIcon, WhatsAppIcon } from '../common/icons';
import { useSiteSettings, whatsappHref } from '../../lib/settings';

// Site footer — the same four columns and wording as the original youcan.legal
// footer: "Find us / Representative office", the logo with "Immigration Support"
// and the social row, "Available Opportunities", then "Legal Information" and
// "Partnerships".
//
// The social links and the partnership email come from `site_settings` (edited
// in /admin); the defaults are the original's own links. Any link left empty is
// simply not rendered, and Telegram / WhatsApp only appear if the owner sets
// them in the admin panel (the original footer has neither).

export default function Footer() {
  const settings = useSiteSettings();

  // The original footer's order: Facebook, Youtube, Instagram, Linkedin, Tiktok.
  const socials = [
    { key: 'facebook', href: settings.facebook_url, label: 'Facebook', icon: <Facebook size={18} /> },
    { key: 'youtube', href: settings.youtube_url, label: 'Youtube', icon: <Youtube size={18} /> },
    { key: 'instagram', href: settings.instagram_url, label: 'Instagram', icon: <Instagram size={18} /> },
    { key: 'linkedin', href: settings.linkedin_url, label: 'Linkedin', icon: <Linkedin size={18} /> },
    { key: 'tiktok', href: settings.tiktok_url, label: 'Tiktok', icon: <TikTokIcon size={18} /> },
    { key: 'telegram', href: settings.telegram_url, label: 'Telegram', icon: <Send size={18} /> },
    { key: 'whatsapp', href: whatsappHref(settings), label: 'WhatsApp', icon: <WhatsAppIcon size={18} /> },
  ].filter((s) => s.href);

  return (
    <footer className="site-footer" id="contacts" data-component="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <p className="footer-eyebrow">Find us</p>
            <h3>Representative office</h3>
            <p style={{ marginBottom: 6 }}>(by appointment only)</p>
            <p>
              <strong>Poland</strong>
              <br />
              Ogrodowa 31
              <br />
              00-894 Warszawa
            </p>
            <img
              className="footer-map"
              src="/assets/images/office-map.webp"
              alt="Map of the representative office at Ogrodowa 31, 00-894 Warszawa"
              loading="lazy"
            />
          </div>

          <div className="footer-col">
            <img className="footer-logo" src="/assets/images/logo.png" alt="You Can Legal" />
            <h3>Immigration Support</h3>
            {socials.length > 0 && (
              <div className="social-row">
                {socials.map((s) => (
                  <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
            {settings.contact_phone && (
              <p style={{ marginTop: 14 }}>
                <a href={`tel:${settings.contact_phone.replace(/[^\d+]/g, '')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Phone size={15} /> {settings.contact_phone}
                </a>
              </p>
            )}
          </div>

          <div className="footer-col">
            <h3>Available Opportunities</h3>
            <ul>
              <li>
                <Link to="/work-in-poland/">Work in Poland</Link>
              </li>
              <li>
                <Link to="/work-in-slovakia/">Work in Slovakia</Link>
              </li>
              <li>
                <Link to="/work-in-serbia/">Work in Serbia</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Legal Information</h3>
            <p>
              YOU CAN LEGAL SERVICES LTD
              <br />
              Company number <strong>16872568</strong> — for verification, please visit{' '}
              <a href="https://find-and-update.company-information.service.gov.uk/company/16872568" target="_blank" rel="noopener noreferrer">
                this link
              </a>
              .
              <br />
              <strong>Registration address</strong> — 167-169 Great Portland Street, London, England, W1W 5PF
              <br />
              (This serves solely as a registered address; for in-office meetings, please use our representative office in Poland.)
            </p>

            <h3 style={{ marginTop: '22px' }}>Partnerships</h3>
            <p>
              For all partnership and collaboration inquiries, please contact us at{' '}
              {settings.contact_email ? (
                <a href={`mailto:${settings.contact_email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Mail size={14} /> {settings.contact_email}
                </a>
              ) : (
                <span>our contact email</span>
              )}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>All Rights Reserved</span>
          <Link to="/privacy-policy/">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
