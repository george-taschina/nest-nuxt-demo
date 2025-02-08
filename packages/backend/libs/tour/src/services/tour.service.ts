import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { TourRepository } from '../repositories/tour.repository';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';
import { pipe } from 'fp-ts/function';
import { TourGetAvailableResponse } from '@has-george-read/shared/domain/tour/tour-get-available';
import {
  isTourFullyBooked,
  mapTourToGetAvailableResponse,
} from './utils/tour.utils';

@Injectable()
export class TourService extends BaseService {
  constructor(private readonly tourRepository: TourRepository) {
    super();
  }

  public getAvailableTours(): TE.TaskEither<
    DatabaseError,
    TourGetAvailableResponse[]
  > {
    return pipe(
      this.tourRepository.getAvailableTours(),
      TE.tapIO((tours) => TE.of(this.logger.debug(`Found ${tours}`))),
      TE.map((tours) => tours.filter((tour) => !isTourFullyBooked(tour))),
      TE.map((tours) => {
        return tours.map((tour) => mapTourToGetAvailableResponse(tour));
      })
    );
  }
}
