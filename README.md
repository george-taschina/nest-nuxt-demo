# Nuxt 3 + NestJS Monorepo Project

A full-stack application with Nuxt 3 frontend and NestJS backend in a monorepo setup.

## 🚀 Prerequisites

- Docker (20.10.0+ recommended)
- Node.js >20.x
- npm (version compatible with Node 20+)
- Make (optional, but recommended for command shortcuts)

## ⚙️ Environment Setup

1. Clone the repository
2. Copy environment files:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env

   ```

3. Update the environment variables in both `.env` files as needed

## 🛠️ Getting Started

### Initial Setup

```bash
make setup       # Install dependencies and build Docker images
make start       # Start all services in Docker containers
make create-db   # Create and initialize database
```

### Development Modes

**Option 1: Docker Containers (Production-like)**

- Access application at `http://localhost:8000`
- API available at `http://localhost:3000`

**Option 2: Local Development**

```bash
docker stop george_devel_backend george_devel_frontend  # Stop containers if running
npm run backend:start:dev     # Start NestJS in dev mode
npm run frontend:start:dev    # Start Nuxt 3 in dev mode
```

- Frontend: `http://localhost:8000`
- Backend: `http://localhost:3000`

## 🧪 Testing

### Unit Tests

```bash
npm run backend:test
```

### E2E Tests

```bash
make create-db              # Ensure clean database
npm run backend:test:e2e    # Run end-to-end tests
```

## 📂 Project Structure

Copy

├── backend/ # NestJS application
├── frontend/ # Nuxt 3 application
├── docker-compose.yml
├── Makefile
└── package.json

## 🛠️ Common Commands

### Make Commands

bash

Copy

make setup # Install dependencies and build containers
make start # Start all services
make stop # Stop all services
make clean # Remove containers and volumes
make create-db # Initialize database

### NPM Scripts

```bash
# Frontend
npm run frontend:start:dev
npm run frontend:build
npm run frontend:start:prod

# Backend
npm run backend:start:dev
npm run backend:build
npm run backend:start:prod

# Testing
npm run backend:test
npm run backend:test:e2e
```

## 🔧 Troubleshooting

- **Port Conflicts**: Ensure Docker containers are stopped before running local dev servers
- **Database Issues**: Run `make create-db` to reset the database
- **Docker Cleanup**: Use `make clean` if encountering container issues

## 📄 License

[APACHE 2.0](https://www.apache.org/licenses/LICENSE-2.0) - See the LICENSE file for details

---

> **Note**: For production deployment, ensure to build both applications and configure proper environment variables
