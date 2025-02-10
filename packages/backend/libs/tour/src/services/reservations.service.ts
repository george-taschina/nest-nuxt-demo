import { Reservation } from '../models/reservation.entity';
import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { ReservationRepository } from '../repositories/reservation.repository';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import * as T from 'fp-ts/Task';
import {
  ConflictError,
  DatabaseError,
  LockError,
  NotFoundError,
} from '@has-george-read-backend/core/types/errors';
import { pipe } from 'fp-ts/function';
import { BookingService } from './booking.service';
import { TourService } from './tour.service';
import { EntityManager } from '@mikro-orm/mysql';

const SECONDS_TO_RESERVE_SEATS = 900;

@Injectable()
export class ReservationService extends BaseService {
  private em: EntityManager;
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly bookingService: BookingService,
    private readonly tourService: TourService
  ) {
    super();

    this.em = reservationRepository.getEntityManager();
  }

  public reserveSeats(
    tourId: string,
    userId: string,
    numberOfSeats: number
  ): TE.TaskEither<
    ConflictError | DatabaseError | LockError | NotFoundError,
    Reservation
  > {
    const wait10Seconds = TE.fromTask(T.delay(10_000)(T.of<void>(void 0)));

    return TE.tryCatch(
      () =>
        this.em.transactional(async () => {
          const result = await pipe(
            TE.Do,
            TE.bindW('tour', () => this.tourService.findByIdOrFail(tourId)),
            TE.chainFirstW(() => wait10Seconds),
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
              pipe(
                this.reservationRepository.reserveSeats(
                  tourId,
                  userId,
                  numberOfSeats,
                  SECONDS_TO_RESERVE_SEATS
                ),
                TE.tap(() =>
                  this.tourService.lockAndUpdateById(tour.id, tour.version)
                )
              )
            )
          )();

          if (E.isLeft(result)) throw result.left;
          return result.right;
        }),
      (error) =>
        error as ConflictError | DatabaseError | LockError | NotFoundError
    );
  }

  public getActiveReservationsByTourId(
    tourId: string
  ): TE.TaskEither<DatabaseError, Reservation[]> {
    return this.reservationRepository.getReservationsByTourId(tourId);
  }
}
