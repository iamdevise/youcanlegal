import { Link, useParams } from 'react-router-dom';
import { Twitter, Facebook, Linkedin } from 'lucide-react';
import { POSTS } from '../data/posts';

// /blog/:slug/ — single article with share links, prev/next, related posts.
export default function BlogPostPage() {
  const { slug } = useParams();
  const idx = POSTS.findIndex((p) => p.slug === slug.replace(/\/$/, ''));
  const post = POSTS[idx];

  if (!post) {
    return (
      <div className="container notfound" data-component="article-not-found">
        <h1 style={{ fontSize: '2.4rem' }}>Article not found</h1>
        <p>The article you are looking for does not exist.</p>
        <Link to="/blog/" className="btn btn-primary">Back to all articles</Link>
      </div>
    );
  }

  const prev = POSTS[idx - 1];
  const next = POSTS[idx + 1];
  const shareUrl = `https://youcan.legal/blog/${post.slug}/`;
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="article" data-component="blog-article">
      <span className="article-cat">Legal Advice</span>
      <h1>{post.title}</h1>
      <div className="article-meta">{post.date} · by admin · 0 Comments</div>

      <div className="article-body">
        {post.body.map((block, i) => {
          if (block.h2) return <h2 key={i}>{block.h2}</h2>;
          return <p key={i}>{block.p}</p>;
        })}
      </div>

      <div className="article-share">
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter"><Twitter size={18} /></a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><Facebook size={18} /></a>
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Linkedin size={18} /></a>
      </div>

      <nav className="post-nav" aria-label="Post navigation">
        {prev ? (
          <a href={`/blog/${prev.slug}/`}>
            <span className="dir">← Prev</span>
            <strong>{prev.title}</strong>
          </a>
        ) : <span />}
        {next ? (
          <a href={`/blog/${next.slug}/`} style={{ textAlign: 'right' }}>
            <span className="dir">Next →</span>
            <strong>{next.title}</strong>
          </a>
        ) : <span />}
      </nav>

      <section className="related">
        <h2>Related Posts</h2>
        <div className="blog-grid">
          {related.map((p) => (
            <article className="blog-card" key={p.slug}>
              <span className="blog-cat">Legal Advice</span>
              <h2>{p.title}</h2>
              <div className="blog-meta">{p.date} · by admin</div>
              <Link to={`/blog/${p.slug}/`} className="btn btn-outline">Read more</Link>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
