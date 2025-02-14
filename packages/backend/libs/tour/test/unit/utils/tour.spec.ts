import { createFixtureTour } from '../../fixtures/fixture-tour';
import { createFixtureBooking } from '../../fixtures/fixture-booking';
import {
  countTotalOccupiedSeats,
  getNumberOfReservedSeats,
  getNumberOfSuccessfulBookedSeats,
  isTourFullyBooked,
} from '@nest-nuxt-demo-backend/tour/utils/tour.utils';
import { createFixtureReservation } from '../../fixtures/fixture-reservation';
import moment from 'moment';

describe('Tour Utils', () => {
  // Bookings
  const validCompletedBooking = createFixtureBooking();
  validCompletedBooking.paymentStatus = 'completed';
  const validPendingBooking = createFixtureBooking();
  validPendingBooking.paymentStatus = 'pending';
  const validFailedBooking = createFixtureBooking();
  validFailedBooking.paymentStatus = 'failed';

  // Reservations
  const validFutureReservation = createFixtureReservation();
  validFutureReservation.expiresAt = moment().add(50, 'minutes').toDate();
  const validFutureReservation2 = createFixtureReservation();
  validFutureReservation2.expiresAt = moment().add(15, 'minutes').toDate();
  const validPastReservation = createFixtureReservation();
  validPastReservation.expiresAt = moment().subtract(15, 'minutes').toDate();

  describe('getNumberOfSuccessfulBookedSeats', () => {
    it('should only count the bookings that are pending and completed', async () => {
      const tour = createFixtureTour(
        [],
        [validCompletedBooking, validPendingBooking, validFailedBooking]
      );

      const result = getNumberOfSuccessfulBookedSeats(tour);

      expect(result).toEqual(2);
    });
  });

  describe('getNumberOfReservedSeats', () => {
    it('should only count the reservations that have expiredAt in the future', async () => {
      const tour = createFixtureTour(
        [validFutureReservation, validFutureReservation2, validPastReservation],
        []
      );

      const result = getNumberOfReservedSeats(tour);

      expect(result).toEqual(2);
    });
  });

  describe('countTotalOccupiedSeats', () => {
    it('should only count the reservations that have expiredAt in the future and the bookings that are pending and completed', async () => {
      const tour = createFixtureTour(
        [validFutureReservation, validFutureReservation2, validPastReservation],
        [validCompletedBooking, validPendingBooking, validFailedBooking]
      );

      const result = countTotalOccupiedSeats(tour);

      expect(result).toEqual(4);
    });
  });

  describe('isTourFullyBooked', () => {
    it('should return true if reserved or booked seats are equal or more thant tour s available seats', async () => {
      const tour = createFixtureTour(
        [validFutureReservation, validFutureReservation2, validPastReservation],
        [validCompletedBooking, validPendingBooking, validFailedBooking]
      );
      tour.totalSeats = 4;

      const result = isTourFullyBooked(tour);

      expect(result).toEqual(true);
    });

    it('should return false if reserved or booked seats are less thant tour s available seats', async () => {
      const tour = createFixtureTour(
        [validFutureReservation, validFutureReservation2, validPastReservation],
        [validCompletedBooking, validPendingBooking, validFailedBooking]
      );
      tour.totalSeats = 5;

      const result = isTourFullyBooked(tour);

      expect(result).toEqual(false);
    });
  });
});
