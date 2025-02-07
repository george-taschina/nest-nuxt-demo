import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { TourRepository } from '../repositories/tour.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TourService extends BaseService {
  constructor(private readonly BookRepository: TourRepository) {
    super();
  }

  public findAllNotDeleted() {
    return this.BookRepository.findAllNotDeleted();
  }
}
