# ADR 001: Choose MySQL for the Demo Project

## Context

I am developing a demo project that requires a fast and simple database setup. The database should support transactions and ensure data integrity while minimizing the overhead of configuration and maintenance. Given the project's limited scope and short timeline, a quick-to-deploy relational database is preferred.

## Decision

I have chosen MySQL as the database for this demo project because:

- Fast setup – MySQL is easy to install and configure, making it ideal for rapid development.
- ACID compliance – MySQL ensures reliable transactions and data integrity when using as engine InnoDB which is the default from mysql 8.4
- Broad adoption – It is well-documented, widely supported, and integrates with many tools.

## Consequences

- Limited scalability considerations – While MySQL is suitable for the demo, it may not be the best choice for a large-scale production system.
