import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Linkedin, Mail } from 'lucide-react';

// Site footer — office, socials, opportunities, legal info (content from original site).
export default function Footer() {
  return (
    <footer className="site-footer" id="contacts" data-component="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/images/logo.png" alt="You Can Legal" />
            <p>
              We help people change their lives. Study. Work. Live abroad — legally.
              Full support from documents to destination.
            </p>
            <div className="social-row">
              <a href="https://www.facebook.com/youcanlegal/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={19} /></a>
              <a href="https://www.youtube.com/@youcanlegal" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={19} /></a>
              <a href="https://www.instagram.com/you_can_legal" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={19} /></a>
              <a href="https://www.linkedin.com/company/you-can-legal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Representative office</h3>
            <p>(by appointment only)</p>
            <p><strong>Poland</strong><br />Ogrodowa 31, 00-894 Warszawa</p>
            <h3 style={{ marginTop: '22px' }}>Partnerships</h3>
            <p>
              <a href="mailto:hello@youcan.legal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Mail size={15} /> hello@youcan.legal
              </a>
            </p>
          </div>
          <div className="footer-col">
            <h3>Available Opportunities</h3>
            <ul>
              <li><Link to="/work-in-poland/">Work in Poland</Link></li>
              <li><Link to="/work-in-slovakia/">Work in Slovakia</Link></li>
              <li><Link to="/work-in-serbia/">Work in Serbia</Link></li>
            </ul>
            <h3 style={{ marginTop: '22px' }}>Legal Information</h3>
            <p>
              YOU CAN LEGAL SERVICES LTD<br />
              Company number <strong>16872568</strong> — for verification, please visit{' '}
              <a href="https://find-and-update.company-information.service.gov.uk/company/16872568" target="_blank" rel="noopener noreferrer">this link</a>.<br />
              <strong>Registration address</strong> — 167-169 Great Portland Street, London, England, W1W 5PF<br />
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
