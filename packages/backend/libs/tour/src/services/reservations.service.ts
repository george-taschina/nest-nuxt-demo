import { Reservation } from '../models/reservation.entity';
import { BaseService } from '@nest-nuxt-demo-backend/core/services/base.service';
import { ReservationRepository } from '../repositories/reservation.repository';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import {
  ConflictError,
  DatabaseError,
  LockError,
  NotFoundError,
} from '@nest-nuxt-demo-backend/core/types/errors';
import { pipe } from 'fp-ts/function';
import { TourService } from './tour.service';
import * as O from 'fp-ts/Option';
import { countTotalOccupiedSeats } from './utils/tour.utils';
import * as T from 'fp-ts//Task';
import { Tour } from '../models/tour.entity';

export const SECONDS_TO_RESERVE_SEATS = 900;
export const MAX_RETRIES = 2;
export const BACKOFF_FACTOR = 1.5;
export const INITIAL_BACKOFF_DELAY = 1000; // 1 second

@Injectable()
export class ReservationService extends BaseService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly tourService: TourService
  ) {
    super();
  }

  public getByIdOrFail(
    reservationId: string
  ): TE.TaskEither<DatabaseError | NotFoundError, Reservation> {
    return pipe(
      this.reservationRepository.getById(reservationId),
      TE.filterOrElseW(
        (result) => O.isSome(result),
        () => new NotFoundError('Could not find reservation')
      ),
      TE.map((result) => result.value)
    );
  }

  public cancelReservation(
    resevationId: string
  ): TE.TaskEither<DatabaseError | NotFoundError, number> {
    return pipe(
      TE.Do,
      TE.bindW('reservation', () => this.getByIdOrFail(resevationId)),
      TE.flatMap(() =>
        this.reservationRepository.cancelReservation(resevationId)
      )
    );
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
      TE.bindW('totalBlockedSeats', ({ tour }) => {
        return TE.of(countTotalOccupiedSeats(tour));
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

  private delay(ms: number): T.Task<void> {
    return () => new Promise((resolve) => setTimeout(resolve, ms));
  }

  public createReservationAndCheckForLocks(
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
      TE.tap(() =>
        this.attemptReservation(
          tourId,
          userId,
          numberOfSeats,
          tourVersion,
          0,
          INITIAL_BACKOFF_DELAY
        )
      )
    );
  }

  private attemptReservation(
    tourId: string,
    userId: string,
    numberOfSeats: number,
    tourVersion: number,
    retries: number,
    delay: number
  ): TE.TaskEither<
    ConflictError | DatabaseError | LockError | NotFoundError,
    Tour
  > {
    return pipe(
      this.tourService.lockAndUpdateById(tourId, tourVersion),
      TE.orElse((error) => {
        if (retries >= MAX_RETRIES || !(error instanceof LockError)) {
          return TE.left(error);
        }

        return pipe(
          this.delay(delay),
          TE.fromTask,
          TE.flatMap(() =>
            this.attemptReservation(
              tourId,
              userId,
              numberOfSeats,
              tourVersion,
              retries + 1,
              delay * BACKOFF_FACTOR
            )
          )
        );
      })
    );
  }
}
