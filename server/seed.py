from .app import app
from .extensions import db
from .models import User
from .models import Piece
from .models import CollectionItem

def seed():
    with app.app_context():
        print("🔄 Dropping and recreating all tables...")
        db.drop_all()
        db.create_all()

        print("👤 Seeding users...")
        user1 = User(username="roy", email="roy@example.com", profile_pic="https://i.pravatar.cc/150?img=1")
        user1.password = "test123"

        user2 = User(username="kai", email="kai@example.com", profile_pic="https://i.pravatar.cc/150?img=2")
        user2.password = "password456"

        db.session.add_all([user1, user2])
        db.session.commit()

        print("🧥 Seeding pieces...")
        piece1 = Piece(
            category="Jacket",
            image_url="https://images.unsplash.com/photo-1618354691249-58742d321d79?auto=format&fit=crop&w=800&q=80",
            description="Vintage denim jacket",
            price=4500,
            rating=5,
            user_id=user1.id
        )

        piece2 = Piece(
            category="Shoes",
            image_url="https://images.unsplash.com/photo-1596464716121-6cd55fda5f67?auto=format&fit=crop&w=800&q=80",
            description="White retro sneakers",
            price=3200,
            rating=4,
            user_id=user2.id
        )

        piece3 = Piece(
            category="T-shirt",
            image_url="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
            description="Graphic tee",
            price=1500,
            rating=5,
            user_id=user1.id
        )

        db.session.add_all([piece1, piece2, piece3])
        db.session.commit()

        print("🛒 Seeding collection items...")
        item1 = CollectionItem(user_id=user1.id, piece_id=piece2.id, quantity=1)
        item2 = CollectionItem(user_id=user2.id, piece_id=piece1.id, quantity=2)
        item3 = CollectionItem(user_id=user1.id, piece_id=piece3.id, quantity=1)

        db.session.add_all([item1, item2, item3])
        db.session.commit()

        print("✅ Seed complete!")

if __name__ == "__main__":
    seed()
