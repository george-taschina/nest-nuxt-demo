import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { TourRepository } from '../repositories/tour.repository';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import {
  DatabaseError,
  LockError,
  NotFoundError,
} from '@has-george-read-backend/core/types/errors';
import { pipe } from 'fp-ts/function';
import { TourGetAvailableResponse } from '@has-george-read/shared/domain/tour/tour-get-available';
import {
  isTourFullyBooked,
  mapTourToGetAvailableResponse,
} from './utils/tour.utils';
import * as O from 'fp-ts/Option';
import { Tour } from '../models/tour.entity';

@Injectable()
export class TourService extends BaseService {
  constructor(private readonly tourRepository: TourRepository) {
    super();
  }

  public findByIdOrFail(
    tourId: string
  ): TE.TaskEither<DatabaseError | NotFoundError, Tour> {
    return pipe(
      this.tourRepository.findById(tourId),
      TE.filterOrElseW(
        (result) => O.isSome(result),
        () => new NotFoundError('Could not find tour')
      ),
      TE.map((result) => result.value)
    );
  }

  public lockAndUpdateById(
    tourId: string,
    expectedVersion: number
  ): TE.TaskEither<DatabaseError | NotFoundError | LockError, Tour> {
    return this.tourRepository.lockAndUpdateById(tourId, expectedVersion);
  }

  public getAvailableTours(): TE.TaskEither<
    DatabaseError,
    TourGetAvailableResponse[]
  > {
    return pipe(
      this.tourRepository.getAvailableTours(),
      TE.map((tours) => tours.filter((tour) => !isTourFullyBooked(tour))),
      TE.map((tours) => {
        return tours.map((tour) => mapTourToGetAvailableResponse(tour));
      })
    );
  }
}
