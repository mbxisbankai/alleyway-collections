import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pfp, setPfp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      username,
      email,
      profile_pic: pfp,
      password
    };

    fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(newUser)
    })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Signup failed');
        setUser(data.user);
        navigate('/');
      })
      .catch((err) => setError(err.message));
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-black">
      <div className="border p-4 rounded" style={{ width: '350px', background: '#1c1c1c' }}>
        <h2 className="text-white mb-4 text-center">Sign Up</h2>
        {error && <div className="text-danger mb-3">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Profile Picture URL</label>
            <input
              type="url"
              name="profile_pic"
              className="form-control"
              value={pfp}
              onChange={(e) => setPfp(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: '#8B0000', color: 'white' }}
          >
            Sign Up
          </button>
        </form>
        <p className="text-white text-center mt-3 mb-0">
          Already have an account?{' '}
          <span
            className="text-danger"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
