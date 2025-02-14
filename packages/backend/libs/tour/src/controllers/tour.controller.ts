import { type TourGetAvailableResponse } from '@nest-nuxt-demo/shared/domain/tour/tour-get-available';
import { Controller, Get, Param } from '@nestjs/common';
import { TourService } from '../services/tour.service';
import {
  TEmapLeftToHttpError,
  TEThrowIfError,
} from '@nest-nuxt-demo-backend/core/controllers/controller-utils';

import { pipe } from 'fp-ts/function';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TOUR_GET_RESPONSE_SCHEMA } from '../documentation/get-tour';

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
    schema: TOUR_GET_RESPONSE_SCHEMA,
    isArray: true,
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
    schema: TOUR_GET_RESPONSE_SCHEMA,
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
