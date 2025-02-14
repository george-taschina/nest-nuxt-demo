# ADR 003: Database Schema Design for Tours, Reservations, and Bookings

## Context

To manage tour bookings effectively, the system requires a well-structured database schema. The main requirements include:

- Storing available tours with details and seat limitations.
- Allowing users to reserve seats while completing checkout, ensuring reservations expire if not confirmed.
- Handling bookings that track the payment process and remove associated reservations upon payment initiation.
- Ensuring data consistency while avoiding unnecessary complexity.

## Decision

The database schema will consist of three main tables:

### **1. Tours Table**

- Stores information about available tours, including start and end dates, details, and a maximum seat count.
- Includes a **version** column to support optimistic locking.

### **2. Reservations Table**

- Allows users to reserve seats before completing payment.
- Has an `expireAt` column to automatically invalidate reservations if not confirmed within **15 minutes**.

### **3. Bookings Table**

- Tracks the status of bookings: **pending, failed, or completed**.
- When a user initiates payment, a **booking** entry is created, and the corresponding reservation is deleted.

### **Concurrency Strategy**

- When creating a reservation, an **optimistic lock** will be applied to the **tour row** using a `version` column.
- This approach is chosen because:
  - It is simpler to implement than maintaining an abstract seat table for each tour.
  - The nature of tours suggests that locking conflicts will be rare.
  - In the event of a conflict, retrying is a viable resolution.

## Consequences

- **Pros:**
  - Ensures data integrity without excessive complexity.
  - Reduces the need for a separate seat management system.
  - Allows safe concurrency handling with minimal overhead.
- **Cons:**
  - If traffic increases significantly, contention on the `tours` table might become an issue.
  - Requires careful handling of retries in case of version conflicts.

## Alternatives Considered

1. **Abstract Seat Table**
   - Rejected due to increased complexity and unnecessary granularity.
2. **Pessimistic Locking on Tours**
   - Rejected as it could introduce blocking and reduce system responsiveness.
