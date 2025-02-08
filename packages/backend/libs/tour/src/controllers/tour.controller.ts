import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TourService } from '../services/tour.service';
import {
  TEmapLeftToHttpError,
  TEThrowIfError,
} from '@has-george-read-backend/core/controllers/controller-utils';
import { pipe } from 'fp-ts/function';
import { Tour } from '../models/tour.entity';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('tours')
@UseInterceptors(CacheInterceptor)
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all tours',
    description: 'Retrieves a list of all available tours',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved list of tours',
    type: [Tour],
  })
  @ApiBadRequestResponse({
    description: 'Database failed connection',
  })
  async search(): Promise<Tour[]> {
    return pipe(
      this.tourService.search(),
      TEmapLeftToHttpError,
      TEThrowIfError
    )();
  }
}
