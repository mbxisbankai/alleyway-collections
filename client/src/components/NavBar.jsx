import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-danger px-3">
      <Link className="navbar-brand text-accent" to="/">Home</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/collection">Collection</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
