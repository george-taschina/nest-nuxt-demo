import { Reservation } from '../models/reservation.entity';
import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { ReservationRepository } from '../repositories/reservation.repository';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import {
  ConflictError,
  DatabaseError,
  LockError,
  NotFoundError,
} from '@has-george-read-backend/core/types/errors';
import { pipe } from 'fp-ts/function';
import { BookingService } from './booking.service';
import { TourService } from './tour.service';

const SECONDS_TO_RESERVE_SEATS = 900;

@Injectable()
export class ReservationService extends BaseService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly bookingService: BookingService,
    private readonly tourService: TourService
  ) {
    super();
  }

  public reserveSeats(
    tourId: string,
    userId: string,
    numberOfSeats: number
  ): TE.TaskEither<
    ConflictError | DatabaseError | LockError | NotFoundError,
    Reservation
  > {
    return pipe(
      TE.Do,
      TE.bindW('tour', () => this.tourService.findByIdOrFail(tourId)),
      TE.bindW('reservations', () =>
        this.reservationRepository.getReservationsByTourId(tourId)
      ),
      TE.bindW('bookings', () =>
        this.bookingService.getPendingOrCompletedBookingsByTourId(tourId)
      ),
      TE.bindW('totalBlockedSeats', ({ reservations, bookings }) => {
        const nBookedSeats: number = bookings.reduce(
          (sum, booking) => sum + booking.seatsBooked,
          0
        );

        const nReservedSeats: number = reservations.reduce(
          (sum, reservation) => sum + reservation.seatsReserved,
          0
        );

        return TE.of(nBookedSeats + nReservedSeats);
      }),
      TE.filterOrElseW(
        ({ tour, totalBlockedSeats }) =>
          totalBlockedSeats + numberOfSeats <= tour.totalSeats,
        () => new ConflictError('Not enough seats available.')
      ),
      TE.flatMap(({ tour }) =>
        this.createReservationAndCheckForLocks(
          tour.id,
          userId,
          numberOfSeats,
          tour.version
        )
      )
    );
  }

  private createReservationAndCheckForLocks(
    tourId: string,
    userId: string,
    numberOfSeats: number,
    tourVersion: number
  ): TE.TaskEither<
    ConflictError | DatabaseError | LockError | NotFoundError,
    Reservation
  > {
    return pipe(
      this.reservationRepository.reserveSeats(
        tourId,
        userId,
        numberOfSeats,
        SECONDS_TO_RESERVE_SEATS
      ),
      TE.tap(() => this.tourService.lockAndUpdateById(tourId, tourVersion))
    );
  }

  public getActiveReservationsByTourId(
    tourId: string
  ): TE.TaskEither<DatabaseError, Reservation[]> {
    return this.reservationRepository.getReservationsByTourId(tourId);
  }
}
