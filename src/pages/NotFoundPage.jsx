import { Link } from 'react-router-dom';

// BrowserRouter catch-all.
export default function NotFoundPage() {
  return (
    <div className="notfound container" data-component="not-found">
      <h1>404</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
