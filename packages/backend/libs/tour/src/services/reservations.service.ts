import { Reservation } from '../models/reservation.entity';
import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { ReservationRepository } from '../repositories/reservation.repository';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import {
  DatabaseError,
  ValidationError,
} from '@has-george-read-backend/core/types/errors';
import { CacheService } from '@has-george-read-backend/core/services/redis.service';
import { pipe } from 'fp-ts/function';

@Injectable()
export class ReservationService extends BaseService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly cacheService: CacheService
  ) {
    super();
  }

  public getReservationsByTourId(
    tourId: string
  ): TE.TaskEither<DatabaseError | ValidationError, Reservation[]> {
    return pipe(
      this.cacheService.get<Reservation[]>(`reservations:${tourId}:*`),
      TE.matchEW(
        () => this.reservationRepository.getReservationsByTourId(tourId),
        (result) =>
          result === null
            ? this.reservationRepository.getReservationsByTourId(tourId)
            : TE.right(result)
      )
    );
  }
}
