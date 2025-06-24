from .extensions import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    profile_pic = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)

    pieces = db.relationship('Piece', back_populates='user')
    collection_items = db.relationship('CollectionItem', back_populates='user', cascade="all, delete-orphan")

    serialize_rules = (
    '-_password_hash',
    '-pieces.user',
    '-collection_items.user',
    '-collection_items.piece.collection_items',
    '-pieces.collection_items'
    )

    @hybrid_property
    def password(self):
        return "Password hashes may not be viewed directly"
    
    @password.setter
    def password(self, plain_password):
        password_hash = bcrypt.generate_password_hash(plain_password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, plain_password):
        return bcrypt.check_password_hash(self._password_hash, plain_password.encode('utf-8'))
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError('Invalid email format')
        return email
    


class Piece(db.Model, SerializerMixin):
    __tablename__ = "pieces"

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer)

    user_id = db.Column(db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='pieces')
    collection_items = db.relationship('CollectionItem', back_populates='piece', cascade="all, delete-orphan")

    serialize_rules = (
    '-user.pieces',
    '-collection_items.piece',
    '-collection_items.user.pieces'
    )

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating is not None and not 1<=rating<=5:
            raise ValueError('Rating must be between 1 and 5')
        return rating



class CollectionItem(db.Model, SerializerMixin):
    __tablename__ = "collection_items"
    
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.ForeignKey('users.id'))
    piece_id = db.Column(db.ForeignKey('pieces.id'))

    user = db.relationship('User', back_populates='collection_items')
    piece = db.relationship('Piece', back_populates='collection_items')

    serialize_rules = (
    '-user.collection_items',
    '-user.pieces',
    '-piece.collection_items',
    '-piece.user.collection_items'
    )

