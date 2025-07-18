from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_restful import Resource
from flask import request, jsonify

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
server_session = Session()