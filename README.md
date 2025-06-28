# Alleyway Collections

Tired of looking through piles of clothes before you see something you like? Alleyway Collections is a vintage thrift store designed to make thrifting easier.

![Alleyway Collections](/assets/Screenshot%20from%202025-06-28%2012-28-09.png "HomePage")
---

## Features

- Session-based authentication (with Flask & Redis)
- User registration and login
- Collection system: add and view your saved thrift items
- Modular Flask REST API with scalable structure
- PostgreSQL (production) 

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
```
Seed the database from the root folder

```bash
python -m server.seed
```

Run the app
```bash
cd server/
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