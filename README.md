# Nuxt 3 + NestJS Monorepo Project

A full-stack application with Nuxt 3 frontend and NestJS backend in a monorepo setup.

## 🚀 Prerequisites

- Docker
- Node.js >20.x
- npm (version compatible with Node 20+)
- Make (optional, but recommended for command shortcuts)

## ⚙️ Environment Setup

1. Clone the repository
2. Copy environment files:

   ```bash
   cp packages/backend/.env.example packages/backend/.env
   cp packages/frontend/.env.example packages/frontend/.env

   ```

3. Update the environment variables in both `.env` files as needed
4. run `npm install`

## 🛠️ Getting Started

### Initial Setup

```bash
make setup       # Install dependencies and build Docker images
make start       # Start all services in Docker containers
make create-db   # Create and initialize database
```

### Development Mode

```bash
npm run backend:start:dev     # Start NestJS in dev mode
npm run frontend:start:dev    # Start Nuxt 3 in dev mode
```

- Frontend: `http://localhost:8000`
- Backend: `http://localhost:3000`

## 📚 API Documentation

When running the backend in development mode, Swagger UI is automatically available at:  
`http://localhost:3000/docs`

> [!warning]
> The docs page could render blank, if that's the case copy the json from `http://localhost:3000/docs-json` and paste it in `https://editor.swagger.io/` to view the documentation

This interactive documentation provides:

- All available API endpoints
- Request/response schemas
- Direct testing capabilities for endpoints

**Note:** Swagger is only enabled in development mode. To access it:

1. Ensure you're running the backend with `npm run backend:start:dev`
2. Open the Swagger UI in your browser at the provided URL

## 🧪 Testing

### Unit Tests

```bash
npm run backend:test
npm run frontend:test
```

### E2E Tests

```bash
make create-db              # Ensure clean database
npm run backend:test:e2e    # Run end-to-end tests
```

## 📂 Project Structure

```bash
.
├── packages
│ ├── backend #NestJs Application
│ │ ├── apps
│ │ │ └── api #EntryPoint Backend
│ │ ├── libs
│ │ │ ├── core #Main module containing configs, loggers and database module
│ │ │ └── tour #Module containing the booking logic
│ │ │ ├── test #Backend Tests
│ │ ├── migrations #Migrations
│ │ ├── mikro-orm.config.ts #Config useful for mikro-orm CLI
│ │ ├── seeders #Seeders, also used for the env of e2e test
│ ├── frontend # Nuxt 3 Application
│ │ ├── components #Components
│ │ │ └── george #Basic components like buttons or inputs
│ │ ├── composables
│ │ ├── layouts
│ │ ├── pages
│ │ ├── stores
│ │ └── utils
│ └── shared # Shared directory for types of api calls
```

## 🛠️ Common Commands

### Make Commands

```bash
make setup # Install dependencies and build containers
make start # Start all services
make create-db # Initialize database
```

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
npm run frontend:test
npm run backend:test:e2e
```

## 🔧 Troubleshooting

- **Port Conflicts**: Ensure Docker containers are stopped before running local dev servers
- **Database Issues**: Run `make create-db` to reset the database
- **Docker Cleanup**: Use `make clean` if encountering container issues

## 📄 License

[MIT](https://opensource.org/license/mit) - See the LICENSE file for details

---

> **Note**: For production deployment, ensure to build both applications and configure proper environment variables
