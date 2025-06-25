import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((res) => {
        return res.json().then((data) => {
          if (!res.ok) throw new Error(data.error || "Login failed");
          return data;
        });
      })
      .then((data) => {
        localStorage.setItem("token", data.access_token);
        navigate("/");
      })
      .catch((err) => setError(err.message));
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-black">
      <div
        className="card p-4 shadow"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#1c1c1e',
          border: '1px solid #ccc'
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#8B0000' }}>
          Alleyway Login
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label" style={{ color: 'white' }}>
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: 'white' }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: '#8B0000', color: 'white' }}
          >
            Log In
          </button>

          <div className="text-center">
            <span style={{ color: 'white' }}>
              Don’t have an account?{' '}
              <Link to="/signup" style={{ color: '#8B0000', textDecoration: 'none' }}>
                Sign up
              </Link>
            </span>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
