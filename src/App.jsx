import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/HomePage';
import WorkInEuPage from './pages/WorkInEuPage';
import CountryPage from './pages/CountryPage';
import StudyInUkPage from './pages/StudyInUkPage';
import PrivacyPage from './pages/PrivacyPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import { ApplyModalProvider } from './components/apply/ApplyModalHost';
import { WhatsAppIcon } from './components/common/icons';
import { Send } from 'lucide-react';
import { useSiteSettings, whatsappHref } from './lib/settings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Floating chat button — reads the WhatsApp link from site settings and falls
// back to Telegram only when WhatsApp is not set. Hidden when both are empty.
function ChatFloat() {
  const settings = useSiteSettings();
  const whatsapp = whatsappHref(settings);
  const href = whatsapp || settings.telegram_url;
  if (!href) return null;

  const isWhatsApp = Boolean(whatsapp);
  return (
    <a
      className={`wa-float${isWhatsApp ? '' : ' wa-float--telegram'}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isWhatsApp ? 'Chat with us on WhatsApp' : 'Chat with us on Telegram'}
    >
      {isWhatsApp ? <WhatsAppIcon size={28} /> : <Send size={26} />}
    </a>
  );
}

function PublicLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work-in-the-eu/" element={<WorkInEuPage />} />
          <Route path="/work-in-poland/" element={<CountryPage countryKey="poland" />} />
          <Route path="/work-in-slovakia/" element={<CountryPage countryKey="slovakia" />} />
          <Route path="/work-in-serbia/" element={<CountryPage countryKey="serbia" />} />
          <Route path="/study-in-the-uk/" element={<StudyInUkPage />} />
          <Route path="/privacy-policy/" element={<PrivacyPage />} />
          <Route path="/blog/" element={<BlogPage />} />
          <Route path="/blog/:slug/" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ChatFloat />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ApplyModalProvider>
        <ScrollToTop />
        <Routes>
          {/* Admin is standalone: no public header, footer or chat button. */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </ApplyModalProvider>
    </BrowserRouter>
  );
}
