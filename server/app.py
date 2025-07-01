from flask import Flask, jsonify, session
from flask_restful import Api, Resource
from flask_session import Session
from flask_cors import CORS
from server.config import Config
from server import models
from server.extensions import db, migrate, bcrypt, server_session
from server.controllers.user_controller import UserController, UserControllerOne
from server.controllers.piece_controller import PieceController, PieceControllerOne
from server.controllers.collection_item_controller import CollectionItemController, CollectionItemControllerOne
from server.controllers.auth_controller import Register, Login, Logout, EditProfile, Me, UserCollection

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    server_session.init_app(app)

    api = Api(app)
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    #Authentication Part
    api.add_resource(Register, '/signup')
    api.add_resource(Login, '/login')
    api.add_resource(Me, '/@me')
    api.add_resource(EditProfile, '/edit-profile')
    api.add_resource(UserCollection, '/user_collection')
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

@app.route('/debug-session')
def debug_session():
    return {"session": dict(session)}


if __name__ == "__main__":
    app.run(debug=True, port=5555)

