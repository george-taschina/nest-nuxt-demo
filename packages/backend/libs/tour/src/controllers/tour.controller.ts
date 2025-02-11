import { TourGetAvailableResponse } from '@has-george-read/shared/domain/tour/tour-get-available';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { TourService } from '../services/tour.service';
import {
  TEmapLeftToHttpError,
  TEThrowIfError,
} from '@has-george-read-backend/core/controllers/controller-utils';

import { pipe } from 'fp-ts/function';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Type } from 'io-ts';

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
    type: Type<TourGetAvailableResponse[]>,
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

  @Get('/:id')
  @ApiOperation({
    summary: 'Get specific tour',
    description: 'Retrieves a tour',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved tour',
    type: Type<TourGetAvailableResponse>,
  })
  @ApiBadRequestResponse({
    description: 'Database failed connection',
  })
  async get(@Param('id') id: string): Promise<TourGetAvailableResponse> {
    return pipe(
      this.tourService.getDetails(id),
      TEmapLeftToHttpError,
      TEThrowIfError
    )();
  }
}
