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
            category="Coat",
            image_url="https://images.vestiairecollective.com/images/resized/w=1246,q=75,f=auto,/produit/black-leather-vetements-coat-32662228-2_3.jpg",
            description="Vetements Coat, leather",
            price=6000,
            rating=5,
            user_id=user1.id
        )

        piece2 = Piece(
            category="Shoes",
            image_url="https://i.ebayimg.com/images/g/jDwAAOSwSAdm1zpY/s-l1200.jpg",
            description="Rick Owens High Ramones canvas sneakers",
            price=500,
            rating=4,
            user_id=user2.id
        )

        piece3 = Piece(
            category="Muslin shirt",
            image_url="https://preview.redd.it/started-a-punk-clothing-brand-what-do-we-think-v0-s9fdw2x1cnid1.jpg?width=1080&crop=smart&auto=webp&s=3cd315eb851c1dd132c58be085b69f10c7cc6d11",
            description="Aurotica Muslin shirt",
            price=93,
            rating=5,
            user_id=user1.id
        )

        piece4 = Piece(
            category="Graphic t-shirt",
            image_url="https://shop.nirvana.com/cdn/shop/files/NIR130080_600x.png?v=1697229513",
            description="Nirvana t-shirt",
            price=10,
            rating=5,
            user_id=user1.id
        )

        piece5 = Piece(
            category="Messenger bag",
            image_url="https://tombeckbe.com/cdn/shop/files/TomBeckbeMessengerBagSawgrass1.jpg?v=1737054019",
            description="Waxed canvas messenger bag",
            price=20,
            rating=5,
            user_id=user2.id
        )

        piece6 = Piece(
            category="Graphic t-shirt",
            image_url="https://target.scene7.com/is/image/Target/GUEST_ccb11994-ddb7-41b4-b002-60ef1c0f7632?wid=488&hei=488&fmt=pjpeg",
            description="Purple rain t-shirt",
            price=10,
            rating=4,
            user_id=user1.id
        )

        piece7 = Piece(
            category="Shoes",
            image_url="https://img01.ztat.net/article/spp-media-p1/2d9be886d6c745e4a63d78eeb629f3af/93305890e2dd43b0b91ad0a511b960e0.jpg?imwidth=1800&filter=packshot",
            description="Puma Palermo Shoes",
            price=40,
            rating=5,
            user_id=user2.id
        )

        db.session.add_all([piece1, piece2, piece3, piece4, piece5, piece6, piece7])
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
