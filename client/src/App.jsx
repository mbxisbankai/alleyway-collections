import React, { useState, useEffect} from 'react'
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

    useEffect(() => {
        fetch("http://127.0.0.1:5555/pieces")
        .then(r => r.json())
        .then(piecesData => setPieces(piecesData))
        .catch((err) => console.error('Error fetching pieces:', err));
    }, [])

    return (
      <Router>
        <NavBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home pieces={pieces} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/pieces/:id" element={<PieceDetails />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;
