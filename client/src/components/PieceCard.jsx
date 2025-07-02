import { Card, Button } from 'react-bootstrap';

function PieceCard({ piece }) {
  function handleAddToCollection(pieceId) {
  fetch(`${process.env.REACT_APP_API_URL}/collection`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ piece_id: pieceId, quantity: 1 })
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to add to collection");
      alert("Added to collection!");
    })
    .catch(err => {
      console.error("Add error:", err);
      alert(err.message);
    });
  }


  return (
    <Card className="bg-dark text-white h-100 border-secondary">
      <Card.Img variant="top" src={piece.image_url} alt={piece.description} />
      <Card.Body>
        <Card.Title>{piece.category}</Card.Title>
        <Card.Text>{piece.description}</Card.Text>
        <Card.Text>
          <strong>Price:</strong> ${piece.price}
        </Card.Text>
        <Button 
          variant="outline-danger" 
          onClick={() => handleAddToCollection(piece.id)}
        >
          Add to Collection
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PieceCard;
