import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfile({ user, setUser }) {
    const navigate = useNavigate();

    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [pfp, setPfp] = useState(user?.profile_pic || '');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const updatedUser = {
            username: username,
            email: email,
            profile_pic: pfp,
            password: password
        }

        fetch(`${process.env.REACT_APP_API_URL}/edit-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
        credentials: "include"
        })
        .then(r => {
            if (!r.ok) throw new Error("Failed to update profile");
            return r.json();
        })
        .then(data => {
            setUser(data.user);
            setMessage("Profile updated successfully");
            navigate("/profile");
        })
        .catch(err => setMessage(err.message));
    }

    return (
        <div className="container text-white">
        <h2>Edit Your Profile</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
            <div className="mb-3">
            <label className="form-label">Username</label>
            <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
            <label className="form-label">Profile Picture URL</label>
            <input name="profile_pic" value={pfp} onChange={(e) => setPfp(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
            <label className="form-label">New Password</label>
            <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" />
            </div>
            <button type="submit" className="btn btn-danger">Save Changes</button>
        </form>
        </div>
    );
    }

export default EditProfile;
