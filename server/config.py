from dotenv import load_dotenv
from datetime import timedelta
import os
import redis

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SESSION_TYPE = "redis"
    # SESSION_TYPE = "filesystem"
    SESSION_PERMANENT = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url(os.getenv("REDIS_URL"))
    SESSION_COOKIE_NAME = "alleyway_session"
    SESSION_KEY_PREFIX = "alleyway_session:"
    SESSION_COOKIE_HTTPONLY = True


    if os.getenv("FLASK_ENV") == "production":
        SESSION_COOKIE_SAMESITE = "None"
        SESSION_COOKIE_SECURE = True
    else:
        SESSION_COOKIE_SAMESITE = "Lax"
        SESSION_COOKIE_SECURE = False


