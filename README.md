# 🚀 Node.js Dockerized Application

A fully containerized Node.js/Express application using MongoDB for storage, Redis for session management, and Nginx as a reverse proxy.  
The project demonstrates a clean development workflow using Docker, Docker Compose, and separate dev/prod configurations.

## 📦 Tech Stack

- **Node.js / Express** — Backend API  
- **MongoDB** — Database  
- **Redis** — Session store  
- **Nginx** — Reverse proxy & load balancing  
- **Docker & Docker Compose** — Containerization & multi-service management  

## 🧱 Features

- User authentication with BCrypt  
- Session-based login using Redis (`connect-redis` + `express-session`)  
- CRUD API for posts  
- Environment-specific Docker configurations (development & production)  
- Nginx reverse proxy setup for production  

## 📁 Project Structure
```bash
.
├── config/             # Environment + config files
├── controllers/        # Business logic
├── models/             # Mongoose schemas
├── routes/             # Express routes
├── middlewares/        # Custom middleware (auth, etc.)
├── nginx/              # Nginx configuration for production
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── Dockerfile
└── index.js
```



## 🔧 Development Setup

1️⃣ **Install dependencies**

```bash
npm install
```
2️⃣ **Start development environment (with hot reload + bind mounts)**

```bash
docker-compose -f docker-compose-base.yml -f docker-compose.dev.yml up --build
```
3️⃣ **API available at:**

```arduino
http://localhost:3000

```
- Mongo, Redis, and Node run in separate containers.

## 🚀 Production Setup
 Build & run production stack:
```bash
docker-compose -f docker-compose-base.yml -f docker-compose.prod.yml up --build -d
```
- Nginx handles incoming traffic
- Node containers run in production mode
- Static configuration optimized for deployment
  
## 🔑 Environment Variables
Create a .env file:
```ini
PORT=4000
MONGO_USER=yourMongoUser
MONGO_PASSWORD=yourMongoPassword
MONGO_IP=mongo
MONGO_PORT=27017
REDIS_URL=redis
REDIS_PORT=6379
SESSION_SECRET=yourSecret
```
## 🧪 API Endpoints
 Auth

- POST /api/v1/users/register

- POST /api/v1/users/login

 Posts

- POST /api/v1/posts

- GET /api/v1/posts

- GET /api/v1/posts/:id

- PUT /api/v1/posts/:id

- DELETE /api/v1/posts/:id


## 🐳 Docker Notes

- The development setup uses:

  -bind mounts

  -read-only file mapping

- anonymous volume for node_modules

- Production uses:

  -Multi-container setup

  -Nginx reverse proxy

  -Isolated networks

  -Environment-specific configs
