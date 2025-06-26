import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">You must be logged in to view your profile.</p>
        <button className="btn btn-outline-dark" onClick={() => navigate('/login')}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
      <div className="border p-4 rounded" style={{ width: '350px', background: '#1c1c1c' }}>
        <h2 className="text-white mb-4 text-center">Your Profile</h2>
        <div className="text-center mb-3">
          <img
            src={user.profile_pic}
            alt="Profile"
            className="rounded-circle"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        </div>
        <div className="text-white">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
