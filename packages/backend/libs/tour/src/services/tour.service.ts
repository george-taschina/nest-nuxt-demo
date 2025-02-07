import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { TourRepository } from '../repositories/tour.repository';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';
import { Tour } from '../models/tour.entity';

@Injectable()
export class TourService extends BaseService {
  constructor(private readonly BookRepository: TourRepository) {
    super();
  }

  public search(): TE.TaskEither<DatabaseError, Tour[]> {
    return this.BookRepository.search();
  }
}
