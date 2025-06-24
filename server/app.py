from flask import Flask, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from .config import Config
from . import models
from .extensions import db, migrate, bcrypt, jwt
from .controllers.user_controller import UserController, UserControllerOne
from .controllers.piece_controller import PieceController, PieceControllerOne
from .controllers.collection_item_controller import CollectionItemController, CollectionItemControllerOne
from .controllers.auth_controller import Register, Login, Logout, jwt_required, get_jwt, blacklist

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    api = Api(app)
    CORS(app)


    @jwt.token_in_blocklist_loader
    def check_if_token_in_blacklist(jwt_header, jwt_payload):
        return jwt_payload["jti"] in blacklist

    @jwt.unauthorized_loader
    def unauthorized_callback(callback):
        return jsonify({"error": "Missing or invalid Authorization header"}), 401

    #Authentication Part
    api.add_resource(Register, '/signup')
    api.add_resource(Login, '/login')
    api.add_resource(Logout, '/logout')

    #CRUD 
    api.add_resource(UserController, '/users')
    api.add_resource(UserControllerOne, '/users/<int:id>')
    api.add_resource(PieceController, '/pieces')
    api.add_resource(PieceControllerOne, '/pieces/<int:id>')

    #Cart Feature
    api.add_resource(CollectionItemController, '/collection')
    api.add_resource(CollectionItemControllerOne, '/collection/<int:id>')

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5555)

