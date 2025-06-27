import { useNavigate, Link } from 'react-router-dom';

function Profile({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("http://localhost:5555/logout", {
      method: "POST",
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          setUser(null);
          navigate('/');
        } else {
          throw new Error("Logout failed");
        }
      })
      .catch(err => {
        console.error(err);
        alert("There was a problem logging out.");
      });
  }

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
    <div className="d-flex align-items-center justify-content-center vh-100 bg-black">
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
        <div className="mt-3 d-flex justify-content-between">
          <Link to="/edit-profile" className="btn btn-outline-light">
            Edit Profile
          </Link>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
