import { Tour } from '@nest-nuxt-demo-backend/tour/models/tour.entity';

export const getNumberOfSuccessfulBookedSeats = (tour: Tour) =>
  tour.bookings
    .filter((booking) => booking.paymentStatus !== 'failed')
    .reduce((sum, booking) => sum + booking.seatsBooked, 0);

export const getNumberOfReservedSeats = (tour: Tour): number =>
  tour.reservations
    .filter((reservation) => reservation.expiresAt >= new Date())
    .reduce((sum, reservation) => sum + reservation.seatsReserved, 0);

export const countTotalOccupiedSeats = (tour: Tour): number => {
  return (
    getNumberOfSuccessfulBookedSeats(tour) + getNumberOfReservedSeats(tour)
  );
};

export const isTourFullyBooked = (tour: Tour): boolean => {
  return countTotalOccupiedSeats(tour) >= tour.totalSeats;
};
