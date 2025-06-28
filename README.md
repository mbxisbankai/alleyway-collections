# Alleyway Collections

Alleyway Collections is a vintage thrift store designed to make thrifting easier.

---

## Features

- Session-based authentication (with Flask & Redis)
- User registration and login
- Collection system: add and view your saved thrift items
- Clean eBay-style frontend using React + Bootstrap
- Modular Flask REST API with scalable structure
- PostgreSQL (production) & SQLite (development)

---

## 🛠 Tech Stack

**Frontend**:
- React
- React Router
- Bootstrap

**Backend**:
- Flask (REST API)
- Flask-RESTful
- SQLAlchemy
- Alembic (migrations)
- Redis (for session management)

**Deployment**:
- Render (for both frontend and backend)
- PostgreSQL (Render managed DB)

---

## 🚀 Getting Started (Local)

### 1. Clone the repo

```bash
git clone https://github.com/mbxisbankai/alleyway-collections.git
cd alleyway-collections
```

### 2. Set up the Backend

```bash
cd server
pipenv install && pipenv shell
flask db upgrade
flask run
```

### 3. Set up the .env file

```bash
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
SESSION_TYPE=redis
```

### 4. Set up the frontend

```bash
cd client/
npm install
npm start
```
---