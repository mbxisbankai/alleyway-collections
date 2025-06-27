import { useState, useEffect, Navigate } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PieceDetails from './pages/PieceDetails';
import Collection from './pages/Collection';
import NotFound from './pages/NotFound';
import EditProfile from './pages/EditProfile';

function App() {
  const [pieces, setPieces] = useState([]);
  const [user, setUser] = useState(null);
  const [refreshCollection, setRefreshCollection] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5555/pieces")
      .then((r) => r.json())
      .then((data) => setPieces(data))
      .catch((err) => console.error("Error fetching pieces:", err));
  }, []);

  useEffect(() => {
  fetch("http://localhost:5555/@me", {
    method: "GET",
    credentials: "include",
  })
    .then((r) => {
      if (!r.ok) throw new Error("Not logged in");
      return r.json();
    })
    .then((data) => {
      setUser(data.user);
    })
    .catch((err) => {
      console.warn("Session not found or expired:", err.message);
      setUser(null);
    });
}, []);

  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home pieces={pieces} user={user} setRefreshCollection={setRefreshCollection}/>} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/signup" element={<Signup setUser={setUser}/>} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
          <Route
            path="/collection"
            element={user ? <Collection user={user} refreshFlag={refreshCollection}/> : <Navigate to="/login" />}
          />
          <Route path="/pieces/:id" element={<PieceDetails />} />
          <Route path="/edit-profile" element={<EditProfile user={user} setUser={setUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
