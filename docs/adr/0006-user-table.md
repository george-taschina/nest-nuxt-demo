# ADR 006: Handling Reservation for Booking System Conflicts

# ADR: User Table for Tour Purchases

## Context

When I was working on the system for handling tour purchases, I realized that asking guests for their email addresses during the purchase process could be valuable not just for completing the transaction, but for analytics as well. Since it’s important for us to understand customer behavior and gain insights into potential business opportunities, I decided to create a `User` table to store this email data.

## Decision

I decided to create a `User` table to store email addresses when a guest purchases a tour.

### Reasoning:

- **Identification for Analytics:** The email address provides a unique way to identify a customer. Storing it allows me to track how many unique individuals are buying tours, and provides a basis for analyzing customer behavior and segmentation.
- **Business Insight:** By associating email addresses with purchases, I can gain insights into how many new customers are buying tours, what types of tours they prefer, and other valuable data that can inform business decisions, like marketing and sales strategies.
- **Ease of Access:** Having a dedicated table makes it easier to query the data when needed. It simplifies the process of extracting insights or running reports based on user behavior.

## Consequences

- **Pros:**
  - It will be easier to segment customers based on their purchase history.
  - I can track unique buyers over time, which will provide deeper insights into customer behavior.
  - It will support targeted marketing efforts, including personalized offers and promotions.
- **Cons:**
  - Since I’m storing email addresses, I need to make sure we handle personal data securely and in compliance with privacy regulations, like GDPR.
