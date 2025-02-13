import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ReservationService } from '@nest-nuxt-demo-backend/tour/services/reservations.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as TE from 'fp-ts/TaskEither';

import {
  ConflictError,
  DatabaseError,
  LockError,
  NotFoundError,
} from '@nest-nuxt-demo-backend/core/types/errors';
import { ReservationRepository } from '@nest-nuxt-demo-backend/tour/repositories/reservation.repository';
import { TourService } from '@nest-nuxt-demo-backend/tour/services/tour.service';
import { createFixtureTour } from '../../fixtures/fixture-tour';
import { createFixtureReservation } from '../../fixtures/fixture-reservation';
import { createFixtureBooking } from '../../fixtures/fixture-booking';

describe('ReservationService', () => {
  let testingModule: TestingModule;
  let reservationRepository: DeepMocked<ReservationRepository>;
  let tourService: DeepMocked<TourService>;

  let reservationService: ReservationService;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [ReservationService],
    })
      .useMocker(() => createMock())
      .compile();

    reservationRepository = await testingModule.get(ReservationRepository);
    reservationService = await testingModule.get(ReservationService);
    tourService = await testingModule.get(TourService);
  });

  afterAll(async () => await testingModule.close());

  beforeEach(() => jest.clearAllMocks());

  describe('reserveSeats', () => {
    it('should return databaseError if tourService.findByIdOrFail returns databaseError', async () => {
      const databaseError = new DatabaseError('Error getting tours');
      tourService.findByIdOrFail.mockReturnValueOnce(TE.left(databaseError));

      const result = await reservationService.reserveSeats('', '', 5)();

      expect(result).toEqualLeft(databaseError);
    });

    it('should return notFoundError if tourService.findByIdOrFail returns notFoundError', async () => {
      const notFoundError = new NotFoundError('Error getting tours');
      tourService.findByIdOrFail.mockReturnValueOnce(TE.left(notFoundError));

      const result = await reservationService.reserveSeats('', '', 5)();

      expect(result).toEqualLeft(notFoundError);
    });

    it('should return ConflictError if there are not enough seats', async () => {
      const conflictError = new ConflictError('Not enough seats available.');

      const validReservation = createFixtureReservation();
      validReservation.seatsReserved = 1;
      const validBooking = createFixtureBooking();
      validBooking.seatsBooked = 1;
      const validTour = createFixtureTour([validReservation], [validBooking]);
      validTour.totalSeats = 3;
      tourService.findByIdOrFail.mockReturnValueOnce(TE.right(validTour));

      const result = await reservationService.reserveSeats('', '', 2)();

      expect(result).toEqualLeft(conflictError);
    });

    it('should return DatabaseError if reservationRepository.reserveSeats returns databaseError', async () => {
      const databaseError = new DatabaseError('Error creating Reservation');
      const validTour = createFixtureTour();
      validTour.totalSeats = 2;
      const validReservation = createFixtureReservation();
      validReservation.seatsReserved = 1;
      tourService.findByIdOrFail.mockReturnValueOnce(TE.right(validTour));
      reservationRepository.reserveSeats.mockReturnValueOnce(
        TE.left(databaseError)
      );

      const result = await reservationService.reserveSeats('', '', 1)();

      expect(result).toEqualLeft(databaseError);
    });

    it('should return DatabaseError if tourService.lockAndUpdateById returns databaseError', async () => {
      const databaseError = new DatabaseError('Error creating Reservation');
      const validTour = createFixtureTour();
      validTour.totalSeats = 2;
      const validReservation = createFixtureReservation();
      validReservation.seatsReserved = 1;
      tourService.findByIdOrFail.mockReturnValueOnce(TE.right(validTour));
      reservationRepository.reserveSeats.mockReturnValueOnce(
        TE.right(validReservation)
      );
      tourService.lockAndUpdateById.mockReturnValueOnce(TE.left(databaseError));

      const result = await reservationService.reserveSeats('', '', 1)();

      expect(result).toEqualLeft(databaseError);
    });

    it('should return LockError and retry 2 times if tourService.lockAndUpdateById returns LockError', async () => {
      const lockError = new LockError('Error creating Reservation');
      const validTour = createFixtureTour();
      validTour.totalSeats = 2;
      const validReservation = createFixtureReservation();
      validReservation.seatsReserved = 1;
      tourService.findByIdOrFail.mockReturnValueOnce(TE.right(validTour));
      reservationRepository.reserveSeats.mockReturnValueOnce(
        TE.right(validReservation)
      );
      tourService.lockAndUpdateById.mockReturnValue(TE.left(lockError));

      const result = await reservationService.reserveSeats('', '', 1)();

      expect(tourService.lockAndUpdateById).toHaveBeenCalledTimes(3);
      expect(result).toEqualLeft(lockError);
    });

    it('should return valid reservation after retrying 2 times if tourService.lockAndUpdateById returns LockError', async () => {
      const lockError = new LockError('Error creating Reservation');
      const validTour = createFixtureTour();
      validTour.totalSeats = 2;
      const validReservation = createFixtureReservation();
      validReservation.seatsReserved = 1;

      tourService.findByIdOrFail.mockReturnValueOnce(TE.right(validTour));

      reservationRepository.reserveSeats.mockReturnValueOnce(
        TE.right(validReservation)
      );

      tourService.lockAndUpdateById
        .mockReturnValueOnce(TE.left(lockError)) // First call returns LockError
        .mockReturnValueOnce(TE.left(lockError)) // Second call returns LockError
        .mockReturnValueOnce(TE.right(validTour)); // Third call returns LockError

      const result = await reservationService.reserveSeats('', '', 1)();

      console.debug(result);

      expect(tourService.lockAndUpdateById).toHaveBeenCalledTimes(3);

      expect(result).toEqualRight(validReservation);
    });

    it('should return valid Reservation', async () => {
      const validTour = createFixtureTour();
      validTour.totalSeats = 2;
      const validReservation = createFixtureReservation();
      validReservation.seatsReserved = 1;
      tourService.findByIdOrFail.mockReturnValueOnce(TE.right(validTour));
      reservationRepository.reserveSeats.mockReturnValueOnce(
        TE.right(validReservation)
      );
      tourService.lockAndUpdateById.mockReturnValueOnce(TE.right(validTour));

      const result = await reservationService.reserveSeats('test', 'test', 1)();

      expect(result).toEqualRight(validReservation);
    });
  });
});
