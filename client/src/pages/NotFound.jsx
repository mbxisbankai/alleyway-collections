import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-black text-white">
      <div className="text-center">
        <h1 className="display-1" style={{ color: '#8B0000' }}>404</h1>
        <h3 className="mb-3">Page Not Found</h3>
        <p className="text-secondary mb-4">
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="btn" style={{ backgroundColor: '#8B0000', color: 'white' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
