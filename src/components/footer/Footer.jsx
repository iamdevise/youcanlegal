import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { TikTokIcon, WhatsAppIcon } from '../common/icons';
import { useSiteSettings, whatsappHref } from '../../lib/settings';

// Site footer + contact section (id="contacts").
// Social and contact links come from `site_settings` (edited in /admin);
// any link left empty is simply not rendered.

export default function Footer() {
  const settings = useSiteSettings();

  const socials = [
    { key: 'telegram', href: settings.telegram_url, label: 'Telegram', icon: <Send size={18} /> },
    { key: 'whatsapp', href: whatsappHref(settings), label: 'WhatsApp', icon: <WhatsAppIcon size={18} /> },
    { key: 'instagram', href: settings.instagram_url, label: 'Instagram', icon: <Instagram size={18} /> },
    { key: 'facebook', href: settings.facebook_url, label: 'Facebook', icon: <Facebook size={18} /> },
    { key: 'tiktok', href: settings.tiktok_url, label: 'TikTok', icon: <TikTokIcon size={18} /> },
    { key: 'youtube', href: settings.youtube_url, label: 'YouTube', icon: <Youtube size={18} /> },
    { key: 'linkedin', href: settings.linkedin_url, label: 'LinkedIn', icon: <Linkedin size={18} /> },
  ].filter((s) => s.href);

  return (
    <footer className="site-footer" id="contacts" data-component="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/images/logo.png" alt="You Can Legal" />
            <p>
              We help people change their lives. Study. Work. Live abroad — legally. Full support from documents to destination.
            </p>
            {socials.length > 0 && (
              <div className="social-row">
                {socials.map((s) => (
                  <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="footer-col">
            <h3>Representative office</h3>
            <p>(by appointment only)</p>
            <p>
              <strong>Poland</strong>
              <br />
              Ogrodowa 31, 00-894 Warszawa
            </p>

            <h3 style={{ marginTop: '22px' }}>Contacts</h3>
            {settings.contact_email && (
              <p>
                <a href={`mailto:${settings.contact_email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Mail size={15} /> {settings.contact_email}
                </a>
              </p>
            )}
            {settings.contact_phone && (
              <p>
                <a href={`tel:${settings.contact_phone.replace(/[^\d+]/g, '')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Phone size={15} /> {settings.contact_phone}
                </a>
              </p>
            )}
            {!settings.contact_email && !settings.contact_phone && <p>Contact details coming soon.</p>}
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
            <h3 style={{ marginTop: '22px' }}>Legal Information</h3>
            <p>
              YOU CAN LEGAL SERVICES LTD
              <br />
              Company number <strong>16872568</strong> — for verification, please visit{' '}
              <a href="https://find-and-update.company-information.service.gov.uk/company/16872568" target="_blank" rel="noopener noreferrer">
                this link
              </a>
              .<br />
              <strong>Registration address</strong> — 167-169 Great Portland Street, London, England, W1W 5PF
              <br />
              (This serves solely as a registered address; for in-office meetings, please use our representative office in Poland.)
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
