from .core_controller import CoreController, CoreControllerOne
from flask import session, request
from ..models import db, CollectionItem

class CollectionItemController(CoreController):
    def __init__(self):
        super().__init__(CollectionItem)

    def post(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Unauthorized"}, 401

        data = request.get_json()
        piece_id = data.get("piece_id")
        quantity = data.get("quantity", 1)  

        if not piece_id:
            return {"error": "Missing piece_id"}, 400

        if not isinstance(quantity, int) or quantity < 1:
            return {"error": "Quantity must be a positive integer"}, 400

        
        existing_item = CollectionItem.query.filter_by(user_id=user_id, piece_id=piece_id).first()
        if existing_item:
            return {"error": "Item already in collection"}, 409

        item = CollectionItem(user_id=user_id, piece_id=piece_id, quantity=quantity)

        try:
            db.session.add(item)
            db.session.commit()
            return item.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class CollectionItemControllerOne(CoreControllerOne):
    def __init__(self):
        super().__init__(CollectionItem)