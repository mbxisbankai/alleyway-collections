from flask_restful import Resource
from flask import request, session

from ..models import db, User

blacklist = set()

class Me(Resource):
    def get(self):
        user_id = session.get('user_id')

        if not user_id:
            return {"error": "Unauthorized"}, 401
        
        user = User.query.filter_by(id=user_id).first()

        return {"user": user.to_dict()}, 201

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

        session['user_id'] = new_user.id
        return {"user": new_user.to_dict()}, 201


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if not user or not user.authenticate(password):
            return {"error": "Invalid username or password."}, 401

        session['user_id'] = user.id
        return {"user": user.to_dict()}, 200
    
class Logout(Resource):
    def post(self):
        if 'user_id' not in session:
            return {"error": "Not logged in."}, 401
        session.clear()
        return {"message": "Logged out successfully."}, 200



