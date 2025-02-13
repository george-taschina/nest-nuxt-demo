# Architecture Decision Record (ADR)

## ADR 002: Choose Mikro-ORM for the Demo Project

### Context

I am developing a demo project that requires an easy-to-use and flexible Object-Relational Mapper (ORM) for working with a relational database. The ORM should provide TypeScript support, be lightweight, and offer strong support for data modeling and migrations. Given the project's limited scope and short timeline, I need an ORM that is quick to set up and has good developer experience. Additionally, Mikro-ORM provides **ACID compliance**, ensuring reliable transactions and data integrity.

Moreover, WeRoad uses Mikro-ORM, and I was assigned this tech case. I took the _palla al balzo_ and decided to use it for this project.

### Decision

I have chosen **Mikro-ORM** as the ORM for this demo project.

### Consequences

✅ **TypeScript support** – Mikro-ORM is built with TypeScript in mind, offering strong type safety.
✅ **Lightweight and fast** – It has a minimal footprint and performs well for small to medium projects.
✅ **Built-in migrations and schema management** – It simplifies database schema management and versioning.
✅ **ACID compliance** – Ensures reliable transactions and data integrity.
❌ **Learning curve** – While simpler than some ORMs, it still requires learning new concepts.
❌ **Not as widely adopted as Sequelize or TypeORM** – It may have fewer third-party integrations.

### Alternatives Considered

- **TypeORM**: More widely used.
- **Prisma**: Excellent developer experience but enforces a specific workflow that may not fit all projects.
