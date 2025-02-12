import { Tour } from '@has-george-read-backend/tour/models/tour.entity';
import { TourGetAvailableResponse } from '@has-george-read/shared/domain/tour/tour-get-available';

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

export const mapTourToGetAvailableResponse = (
  tour: Tour
): TourGetAvailableResponse => ({
  id: tour.id,
  slug: tour.slug,
  name: tour.name,
  description: tour.description,
  startingDate: tour.startingDate,
  endingDate: tour.endingDate,
  price: tour.price,
  totalSeats: tour.totalSeats,
  moods: tour.moods,
  availableSeats: tour.totalSeats - countTotalOccupiedSeats(tour),
});
