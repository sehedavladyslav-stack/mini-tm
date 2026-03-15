import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <p className="not-found-page-code">404</p>
      <h2 id="not-found-title">Page not found</h2>
      <p className="not-found-page-text">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link className="not-found-page-action" to="/">
        Back to dashboard
      </Link>
    </section>
  );
}

export { NotFoundPage };
