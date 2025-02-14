import { BaseService } from '@nest-nuxt-demo-backend/core/services/base.service';
import { TourRepository } from '../repositories/tour.repository';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import {
  DatabaseError,
  LockError,
  NotFoundError,
} from '@nest-nuxt-demo-backend/core/types/errors';
import { pipe } from 'fp-ts/function';
import { TourGetAvailableResponse } from '@nest-nuxt-demo/shared/domain/tour/tour-get-available';
import {
  countTotalOccupiedSeats,
  isTourFullyBooked,
} from '../utils/tour.utils';
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
        return tours.map((tour) => this.mapTourToGetAvailableResponse(tour));
      })
    );
  }

  public getDetails(
    tourId: string
  ): TE.TaskEither<DatabaseError | NotFoundError, TourGetAvailableResponse> {
    return pipe(
      this.findByIdOrFail(tourId),
      TE.map((tour) => this.mapTourToGetAvailableResponse(tour))
    );
  }

  public mapTourToGetAvailableResponse(tour: Tour): TourGetAvailableResponse {
    return {
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
    };
  }
}
