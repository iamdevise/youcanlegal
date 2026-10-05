import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import './styles.css';

function App() {
  return (
    <main className="page-shell">
      <section className="hero" data-component="hero-section">
        <div className="eyebrow"><Sparkles size={16} /> Accio Site Builder</div>
        <h1>Launch a precise, memorable product site in one focused pass.</h1>
        <p className="lede">
          This starter is intentionally small: strong hierarchy, editable tokens, responsive sections,
          and a deployment-ready React/Vite foundation.
        </p>
        <div className="actions" data-component="hero-actions">
          <a className="button primary" href="#contact">Start building <ArrowUpRight size={18} /></a>
          <a className="button secondary" href="#features">Explore system</a>
        </div>
      </section>

      <section className="feature-grid" id="features" data-component="feature-grid">
        {[
          ['Design-led', 'Canvas-inspired design rules keep the page from collapsing into generic AI output.'],
          ['Build-ready', 'The template ships with Vite scripts for local preview, production build, and deployment.'],
          ['Composable', 'Add Supabase only when the matching skill has planned the integration.']
        ].map(([title, copy]) => (
          <article className="card" key={title} data-component="feature-card">
            <ShieldCheck size={22} />
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
