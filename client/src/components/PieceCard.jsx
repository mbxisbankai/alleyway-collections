import React from 'react';
import { Card, Button } from 'react-bootstrap';

function PieceCard({ piece }) {
  return (
    <Card className="bg-dark text-white h-100 border-secondary">
      <Card.Img variant="top" src={piece.image_url} alt={piece.description} />
      <Card.Body>
        <Card.Title>{piece.category}</Card.Title>
        <Card.Text>{piece.description}</Card.Text>
        <Card.Text>
          <strong>Price:</strong> ${piece.price}
        </Card.Text>
        <Button variant="outline-danger">Add to Collection</Button>
      </Card.Body>
    </Card>
  );
}

export default PieceCard;
