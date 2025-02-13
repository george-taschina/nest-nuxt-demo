# ADR 004: Handling HTTP Status Codes for Booking System Conflicts

## Context

The booking system allows users to reserve seats. However, two common issues may arise during the reservation process:

1. **No More Seats Available**: A user attempts to reserve a seat, but the system has no remaining seats to reserve.
2. **Lock Conflict on Row**: A user tries to reserve a seat in a specific row that is temporarily locked due to concurrent booking operations.

To ensure appropriate error handling and smooth client interactions, we need to determine the appropriate HTTP status codes for these scenarios. Specifically, the status codes should differentiate between situations where a user should not retry (no seats available) and where a retry is warranted (lock conflict).

## Decision

We will use the following HTTP status codes to handle these two scenarios:

### 1. **No More Seats Available**

- **HTTP Status Code**: `409 Conflict`
- **Reasoning**: The reservation request cannot be completed because there are no seats left. This is a conflict in the resource state, as the requested seat is unavailable.
- **Client Action**: Clients should **not retry** the request since there will be no available seats. Instead, they should display an appropriate message informing the user that there are no seats available.

### 2. **Lock Conflict on Row**

- **HTTP Status Code**: `412 Precondition Failed`
- **Reasoning**: The specific seat or row the user is attempting to reserve is temporarily locked due to concurrent booking operations. The request cannot be processed because the row is currently in use.
- **Client Action**: Clients should **retry** the request after a short delay, as the lock is likely to be released. This status code clearly communicates to the client that the resource is locked and retrying is a valid option.

## Consequences

- **No More Seats Available**: Clients will know that retrying is not useful since no seats are left. This minimizes wasted requests and resources on the server.
- **Lock Conflict**: The `412 Precondition Failed` status code gives more specific information about the state of the resource (the row is locked), allowing clients to handle retries in a more informed and efficient manner.
- Using these status codes will make the system more predictable and allow clients to handle errors properly.

## Conclusion

- For the scenario where there are no seats available, return `409 Conflict` to indicate that the request cannot be fulfilled.
- For the scenario where there is a lock conflict, return `412 Precondition Failed` to signal that the request can be retried once the resource is available.

This approach ensures clarity in the response and allows clients to handle conflicts appropriately.
