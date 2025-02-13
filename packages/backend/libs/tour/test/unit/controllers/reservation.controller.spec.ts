import {
  ConflictError,
  NotFoundError,
} from './../../../../core/src/types/errors';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ReservationController } from '@nest-nuxt-demo-backend/tour/controllers/reservation.controller';
import { ReservationService } from '@nest-nuxt-demo-backend/tour/services/reservations.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as TE from 'fp-ts/TaskEither';
import {
  DatabaseError,
  LockError,
} from '@nest-nuxt-demo-backend/core/types/errors';
import {
  createFixtureControllerRequestCreateReservation,
  createFixtureReservation,
} from '../../fixtures/fixture-reservation';
import {
  ConflictException,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';

describe('ReservationController', () => {
  let testingModule: TestingModule;
  let reservationController: ReservationController;
  let reservationService: DeepMocked<ReservationService>;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [ReservationController],
    })
      .useMocker(() => createMock())
      .compile();

    reservationController = await testingModule.get(ReservationController);
    reservationService = await testingModule.get(ReservationService);
  });

  afterAll(async () => await testingModule.close());

  beforeEach(() => jest.clearAllMocks());

  describe('save', () => {
    it('should return a valid reservation', async () => {
      const validReservation = createFixtureReservation();
      reservationService.reserveSeats.mockReturnValueOnce(
        TE.right(validReservation)
      );

      const result = await reservationController.save(
        createFixtureControllerRequestCreateReservation()
      );

      expect(result).toEqual({
        createdAt: validReservation.createdAt,
        expiresAt: validReservation.expiresAt,
        id: validReservation.id,
        seatsReserved: validReservation.seatsReserved,
        tourId: undefined,
        userId: undefined,
      });
    });

    it('should return BadRequest if databaseError', async () => {
      const databaseError = new DatabaseError('Error getting reservations');
      reservationService.reserveSeats.mockReturnValueOnce(
        TE.left(databaseError)
      );

      await expect(
        async () =>
          await reservationController.save(
            createFixtureControllerRequestCreateReservation()
          )
      ).rejects.toThrow(databaseError);
    });

    it('should return NotFoundException if NotFoundError', async () => {
      const notFoundError = new NotFoundError(`Can't find tour`);
      reservationService.reserveSeats.mockReturnValueOnce(
        TE.left(notFoundError)
      );

      await expect(
        async () =>
          await reservationController.save(
            createFixtureControllerRequestCreateReservation()
          )
      ).rejects.toThrow(
        new NotFoundException(
          {
            statusCode: 404,
            message: ['Not Found Exception'],
            error: 'Not Found',
          },
          { cause: notFoundError }
        )
      );
    });

    it('should return Precondition Failed Exception if lockError', async () => {
      const lockError = new LockError(
        'This tour has already been locked, retry.'
      );
      reservationService.reserveSeats.mockReturnValueOnce(TE.left(lockError));

      await expect(
        async () =>
          await reservationController.save(
            createFixtureControllerRequestCreateReservation()
          )
      ).rejects.toThrow(
        new PreconditionFailedException(
          {
            statusCode: 412,
            message: ['message'],
            error: 'Lock Error',
          },
          { cause: lockError }
        )
      );
    });

    it('should return Conflict Excpetion if conflicError', async () => {
      const conflictError = new ConflictError('Not enough seats available.');
      reservationService.reserveSeats.mockReturnValueOnce(
        TE.left(conflictError)
      );

      await expect(
        async () =>
          await reservationController.save(
            createFixtureControllerRequestCreateReservation()
          )
      ).rejects.toThrow(
        new ConflictException(
          {
            statusCode: 409,
            message: [''],
            error: 'Conflict Error',
          },
          { cause: conflictError }
        )
      );
    });
  });
});
