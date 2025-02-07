import { Controller, Get } from '@nestjs/common';
import { TourService } from '../services/tour.service';
import {
  TEmapLeftToHttpError,
  TEThrowIfError,
} from '@has-george-read-backend/core/controllers/controller-utils';
import { pipe } from 'fp-ts/function';

@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  async findAll() {
    return pipe(
      this.tourService.findAllNotDeleted(),
      TEmapLeftToHttpError,
      TEThrowIfError
    )();
  }
}
