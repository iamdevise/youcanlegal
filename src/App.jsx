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
import { MessageCircle } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href="https://t.me/youcanlegal"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on Telegram"
    >
      <MessageCircle size={26} />
    </a>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
        <WhatsAppFloat />
      </div>
    </BrowserRouter>
  );
}
