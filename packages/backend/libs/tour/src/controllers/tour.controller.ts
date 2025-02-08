import { TourGetAvailableResponse } from '@has-george-read/shared/domain/tour/tour-get-available';
import { Controller, Get } from '@nestjs/common';
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

@Controller('tours')
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
  async getAvailableTours(): Promise<TourGetAvailableResponse[]> {
    return pipe(
      this.tourService.getAvailableTours(),
      TEmapLeftToHttpError,
      TEThrowIfError
    )();
  }
}
