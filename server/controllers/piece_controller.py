from .core_controller import CoreController, CoreControllerOne, request
from ..models import Piece, db
from flask_jwt_extended import get_jwt_identity, jwt_required

class PieceController(CoreController):
    def __init__(self):
        super().__init__(Piece)

    @jwt_required()
    def post(self):
        data = request.get_json()

        try:
            price = float(data["price"])
            rating = float(data["rating"])
        except (KeyError, ValueError, TypeError):
            return {"error": "Price and rating must be valid numbers"}, 400

        if price <= 0 or not (0 <= rating <= 5):
            return {"error": "Price must be > 0 and rating must be between 0 and 5"}, 400

        user_id = get_jwt_identity()
        if not user_id:
            return {"error": "Authentication required"}, 401

        new_piece = Piece(
            category=data.get("category"),
            image_url=data.get("image_url"),
            description=data.get("description"),
            price=price,
            rating=rating,
            user_id=user_id
        )

        db.session.add(new_piece)
        db.session.commit()

        return new_piece.to_dict(), 201

class PieceControllerOne(CoreControllerOne):
    def __init__(self):
        super().__init__(Piece)