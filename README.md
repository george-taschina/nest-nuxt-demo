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

### Development Modes

**Option 1: Docker Containers (Production-like)**

> [!warning]
> The version of nuxt/image package used in this project has some problems while running in containers or production build

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

## 📚 API Documentation

When running the backend in development mode, Swagger UI is automatically available at:  
`http://localhost:3000/docs`

> [!warning]
> The docs page could render blank, if that's the case copy the json from `http://localhost:3000/docs-json` and paste it in `https://editor.swagger.io/`

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
```

### E2E Tests

```bash
make create-db              # Ensure clean database
npm run backend:test:e2e    # Run end-to-end tests
```

## 📂 Project Structure

```bash
.
├── LICENSE
├── Makefile
├── README.md
├── bruno
├── docker
│ └── devel
│ ├── Dockerfile
│ └── config
│ └── zshrc
├── docker-compose.yml
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── packages
│ ├── backend #NestJs Application
│ │ ├── README.md
│ │ ├── apps
│ │ │ └── api
│ │ │ ├── src
│ │ │ │ ├── app.module.ts
│ │ │ │ ├── config
│ │ │ │ │ └── app-config.loader.ts
│ │ │ │ ├── main.ts
│ │ │ │ └── types
│ │ │ │ └── app-config.ts
│ │ │ └── tsconfig.app.json
│ │ ├── global.spec.d.ts
│ │ ├── jest-e2e.json
│ │ ├── jest.config.json
│ │ ├── libs
│ │ │ ├── core
│ │ │ │ ├── src
│ │ │ │ │ ├── config
│ │ │ │ │ │ ├── app-config.loader.ts
│ │ │ │ │ │ ├── config-module-provider.ts
│ │ │ │ │ │ ├── database-config.loader.ts
│ │ │ │ │ │ └── redis-config.loader.ts
│ │ │ │ │ ├── controllers
│ │ │ │ │ │ └── controller-utils.ts
│ │ │ │ │ ├── core.module.ts
│ │ │ │ │ ├── filters
│ │ │ │ │ │ └── george-exceptions.filter.ts
│ │ │ │ │ ├── index.ts
│ │ │ │ │ ├── logger
│ │ │ │ │ │ ├── george.logger.ts
│ │ │ │ │ │ ├── get-extra-logging-info.ts
│ │ │ │ │ │ ├── log-fp-utils.ts
│ │ │ │ │ │ ├── sentry.ts
│ │ │ │ │ │ └── utils.ts
│ │ │ │ │ ├── middleware
│ │ │ │ │ │ └── logging.middleware.ts
│ │ │ │ │ ├── modules
│ │ │ │ │ │ ├── database-module.ts
│ │ │ │ │ │ └── redis-module.ts
│ │ │ │ │ ├── services
│ │ │ │ │ │ ├── base.service.ts
│ │ │ │ │ │ └── redis.service.ts
│ │ │ │ │ ├── types
│ │ │ │ │ │ ├── database-config.ts
│ │ │ │ │ │ ├── environment-config.ts
│ │ │ │ │ │ ├── environment.ts
│ │ │ │ │ │ ├── errors.ts
│ │ │ │ │ │ ├── redis-config.ts
│ │ │ │ │ │ └── throwable.ts
│ │ │ │ │ └── utils
│ │ │ │ │ ├── environments.ts
│ │ │ │ │ └── george-context.ts
│ │ │ │ └── tsconfig.lib.json
│ │ │ └── tour
│ │ │ ├── src
│ │ │ │ ├── controllers
│ │ │ │ │ ├── booking.controller.ts
│ │ │ │ │ ├── reservation.controller.ts
│ │ │ │ │ └── tour.controller.ts
│ │ │ │ ├── documentation
│ │ │ │ │ ├── create-booking.ts
│ │ │ │ │ └── create-reservation.ts
│ │ │ │ ├── models
│ │ │ │ │ ├── booking.entity.ts
│ │ │ │ │ ├── entities-list.ts
│ │ │ │ │ ├── reservation.entity.ts
│ │ │ │ │ ├── tour.entity.ts
│ │ │ │ │ └── user.entity.ts
│ │ │ │ ├── repositories
│ │ │ │ │ ├── booking.repository.ts
│ │ │ │ │ ├── reservation.repository.ts
│ │ │ │ │ ├── tour.repository.ts
│ │ │ │ │ └── user.repository.ts
│ │ │ │ ├── services
│ │ │ │ │ ├── booking.service.ts
│ │ │ │ │ ├── reservations.service.ts
│ │ │ │ │ ├── tour.service.ts
│ │ │ │ │ ├── user.service.ts
│ │ │ │ │ └── utils
│ │ │ │ │ └── tour.utils.ts
│ │ │ │ └── tour.module.ts
│ │ │ ├── test
│ │ │ │ ├── fixtures
│ │ │ │ │ ├── fixture-booking.ts
│ │ │ │ │ ├── fixture-reservation.ts
│ │ │ │ │ └── fixture-tour.ts
│ │ │ │ ├── integration
│ │ │ │ │ └── controllers
│ │ │ │ │ └── tour.controller.e2e-spec.ts
│ │ │ │ └── unit
│ │ │ │ ├── controllers
│ │ │ │ │ ├── reservation.controller.spec.ts
│ │ │ │ │ └── tour.controller.spec.ts
│ │ │ │ └── services
│ │ │ │ ├── reservation.service.spec.ts
│ │ │ │ └── tour.service.spec.ts
│ │ │ └── tsconfig.lib.json
│ │ ├── migrations
│ │ │ └── Migration20250210203801.ts
│ │ ├── mikro-orm.config.ts
│ │ ├── nest-cli.json
│ │ ├── package.json
│ │ ├── seeders
│ │ │ ├── BookingSeeder.ts
│ │ │ ├── DatabaseSeeder.ts
│ │ │ ├── ReservationSeeder.ts
│ │ │ ├── TourSeeder.ts
│ │ │ └── UserSeeder.ts
│ │ ├── temp
│ │ │ ├── Book.ts.json
│ │ │ ├── Booking.ts.json
│ │ │ ├── Reservation.ts.json
│ │ │ ├── Tour.ts.json
│ │ │ ├── TourMoods.ts.json
│ │ │ └── User.ts.json
│ │ ├── tsconfig.build.json
│ │ ├── tsconfig.json
│ │ └── webpack.config.js
│ ├── frontend # Nuxt 3
│ │ ├── README.md
│ │ ├── app.vue
│ │ ├── components
│ │ │ ├── Navbar.vue
│ │ │ ├── TourCard.vue
│ │ │ └── george
│ │ │ ├── Button.vue
│ │ │ └── Input.vue
│ │ ├── composables
│ │ │ ├── useApi.ts
│ │ │ ├── useBooking.ts
│ │ │ ├── useReservation.ts
│ │ │ └── useTour.ts
│ │ ├── layouts
│ │ │ └── default.vue
│ │ ├── nuxt.config.ts
│ │ ├── package.json
│ │ ├── pages
│ │ │ ├── booking
│ │ │ │ └── [id]
│ │ │ │ ├── pay.vue
│ │ │ │ └── start.vue
│ │ │ ├── expired.vue
│ │ │ ├── index.vue
│ │ │ └── success.vue
│ │ ├── plugins
│ │ │ └── api.ts
│ │ ├── public
│ │ │ ├── favicon.ico
│ │ │ ├── logo.svg
│ │ │ ├── palm.png
│ │ │ ├── robots.txt
│ │ │ └── traveler.webp
│ │ ├── server
│ │ │ └── tsconfig.json
│ │ ├── stores
│ │ │ └── useReservationStore.ts
│ │ ├── tailwind.config.js
│ │ ├── tsconfig.json
│ │ └── utils
│ │ ├── formatDate.ts
│ │ └── formatPrice.ts
│ └── shared # Shared directory for types of api calls
│ ├── domain
│ │ ├── http-error.ts
│ │ └── tour
│ │ ├── booking.ts
│ │ ├── reservation.ts
│ │ └── tour-get-available.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── types
│ └── brand.ts
├── redis
│ ├── data
│ │ └── dump.rdb
│ └── redis.conf
├── setup.sh
├── start.sh
└── tsconfig.json
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
