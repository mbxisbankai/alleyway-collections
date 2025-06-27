import React, { useEffect, useState } from 'react';

function Collection({ user, refreshFlag }) {
  const [collection, setCollection] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("http://localhost:5555/user_collection", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch collection");
        return res.json();
      })
      .then(data => setCollection(data))
      .catch(err => setError(err.message));
  }, [refreshFlag]); // re-fetch when this changes

  function handleRemove(itemId) {
    fetch(`http://localhost:5555/collection/${itemId}`, {
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
