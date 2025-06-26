import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PieceDetails from './pages/PieceDetails';
import Collection from './pages/Collection';

function App() {
  const [pieces, setPieces] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/pieces")
      .then((r) => r.json())
      .then((data) => setPieces(data))
      .catch((err) => console.error("Error fetching pieces:", err));
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user:", err.message);
      }
    } else {
      console.warn("No user data found in localStorage");
    }
  }, []);

  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home pieces={pieces} />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/signup" element={<Signup setUser={setUser}/>} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/pieces/:id" element={<PieceDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
