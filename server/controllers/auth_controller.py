from flask_restful import Resource
from flask import request, session, make_response

from ..models import db, User, CollectionItem

blacklist = set()

class Me(Resource):
    def get(self):
        user_id = session.get('user_id')

        if not user_id:
            return {"error": "Unauthorized"}, 401
        
        user = User.query.filter_by(id=user_id).first()

        return make_response({"user": user.to_dict()}, 201)
    
class EditProfile(Resource):
    def patch(self):
        print("Session during edit-profile:", dict(session))  
        user_id = session.get('user_id')
        if not user_id:
            return {"error": "Unauthorized"}, 401

        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        data = request.get_json()

        if "username" in data:
            user.username = data["username"]
        if "email" in data:
            user.email = data["email"]
        if "profile_pic" in data:
            user.profile_pic = data["profile_pic"]
        if "password" in data:
            user.password = data["password"]

        db.session.commit()
        return make_response({"user": user.to_dict()}, 200)

class Register(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        email = data.get('email')
        profile_pic = data.get('profile_pic')
        password = data.get('password')

        if not username or not password:
            return {"error": "All fields are required."}, 400

        if User.query.filter((User.username == username)).first():
            return {"error": "Username already exists."}, 409

        new_user = User(
            username=username,
            email=email,
            profile_pic=profile_pic
        )
        new_user.password = password
        db.session.add(new_user)
        db.session.commit()

        session.permanent = True
        session['user_id'] = new_user.id
        return make_response({"user": new_user.to_dict()}, 201)


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if not user or not user.authenticate(password):
            return {"error": "Invalid username or password."}, 401

        session.permanent = True
        session['user_id'] = user.id
        session.modified = True 

        print("Session after login:", dict(session))
        return make_response({"user": user.to_dict()}, 200)

    
class Logout(Resource):
    def post(self):
        if 'user_id' not in session:
            return {"error": "Not logged in."}, 401
        session.clear()
        return {"message": "Logged out successfully."}, 200
    
class UserCollection(Resource):
    def get(self):
        user_id = session.get("user_id")
        print("Session:", dict(session))
        if not user_id:
            return {"error": "Unauthorized"}, 401

        collection_items = CollectionItem.query.filter_by(user_id=user_id).all()
        return make_response([item.to_dict() for item in collection_items], 200)



