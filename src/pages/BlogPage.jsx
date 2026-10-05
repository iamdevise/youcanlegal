import { Link } from 'react-router-dom';
import { POSTS } from '../data/posts';

// /blog/ — Legal Advice category listing (7 articles).
export default function BlogPage() {
  return (
    <div className="container blog-listing" data-component="blog-listing">
      <span className="blog-cat">Legal Advice</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--color-ink-heading)', margin: '10px 0 30px' }}>
        Honest Answers to Common Questions
      </h1>
      <div className="blog-grid">
        {POSTS.map((p) => (
          <article className="blog-card" key={p.slug}>
            <span className="blog-cat">Legal Advice</span>
            <h2>{p.title}</h2>
            <div className="blog-meta">{p.date} · by admin</div>
            <p className="blog-excerpt">{p.excerpt}</p>
            <Link to={`/blog/${p.slug}/`} className="btn btn-outline">Read more</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
