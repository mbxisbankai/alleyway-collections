import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Collection from './pages/Collection';
import NotFound from './pages/NotFound';
import EditProfile from './pages/EditProfile';

function App() {
  const [pieces, setPieces] = useState([]);
  const [user, setUser] = useState(null);
  const [refreshCollection, setRefreshCollection] = useState(0);

  useEffect(() => {
    fetch("https://alleyway-collections.onrender.com/pieces")
      .then((r) => r.json())
      .then((data) => setPieces(data))
      .catch((err) => console.error("Error fetching pieces:", err));
  }, []);

  useEffect(() => {
  fetch("https://alleyway-collections.onrender.com/@me", {
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
          <Route path="/collection" element={<Collection user={user} refreshFlag={refreshCollection}/>} />
          <Route path="/edit-profile" element={<EditProfile user={user} setUser={setUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
