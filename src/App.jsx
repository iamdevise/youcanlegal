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
import ChatFloat from './components/chat/ChatFloat';

// Scroll handling on navigation.
//
// No hash → jump to the top, as before. With a hash (for example
// /work-in-the-eu/#opportunities) → scroll smoothly to that element. The target
// section may not exist yet on the first paint, so it retries briefly. Depending
// on location.key as well as the path means it also works when the visitor is
// already on that page and clicks the same link again.
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash ? location.hash.slice(1) : '';
    if (!id) {
      window.scrollTo(0, 0);
      return undefined;
    }

    let tries = 0;
    let timer;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (tries < 25) {
        tries += 1;
        timer = window.setTimeout(tryScroll, 60);
      }
    };
    tryScroll();
    return () => window.clearTimeout(timer);
  }, [location.key, location.pathname, location.hash]);

  return null;
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
