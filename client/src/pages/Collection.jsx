import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Collection({ user, refreshFlag }) {
  const [collection, setCollection] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://alleyway-collections.onrender.com/user_collection", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch collection");
        return res.json();
      })
      .then(data => setCollection(data))
      .catch(err => setError(err.message));
  }, [refreshFlag]);

  function handleRemove(itemId) {
    fetch(`https://alleyway-collections.onrender.com/collection/${itemId}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          setCollection(collection.filter(item => item.id !== itemId));
        } else {
          throw new Error("Failed to remove item");
        }
      })
      .catch(err => setError(err.message));
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
    <div className="container text-white">
      <h2>Your Collection</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {collection.length === 0 ? (
        <p>You have no items in your collection.</p>
      ) : (
        <div className="row">
          {collection.map(item => (
            <div key={item.id} className="col-md-4 mb-3">
              <div className="card bg-dark text-white h-100">
                <img src={item.piece.image_url} className="card-img-top" alt={item.piece.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.piece.name}</h5>
                  <p className="card-text">{item.piece.description}</p>
                  {user ? (<button
                    onClick={() => handleRemove(item.id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>) : (
                    <small className="text-muted">Login to add to collection</small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collection;
