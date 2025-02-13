import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { BookingResponse } from '@nest-nuxt-demo/shared/domain/tour/booking';
import {
  TEmapLeftToHttpError,
  TEThrowIfError,
} from '@nest-nuxt-demo-backend/core/controllers/controller-utils';

import { pipe } from 'fp-ts/function';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.entity';
import {
  CreateBookingDto,
  BOOKING_CREATE_REQUEST_SCHEMA,
} from '../documentation/create-booking';
import * as TE from 'fp-ts/TaskEither';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a booking',
    description: 'Create a booking by receiving a resevationID',
  })
  @ApiBody({
    description: 'Booking creation data',
    schema: BOOKING_CREATE_REQUEST_SCHEMA,
  })
  @ApiOkResponse({
    description: 'Successfully booked',
    type: Booking,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async save(
    @Body(new ValidationPipe())
    body: CreateBookingDto
  ): Promise<BookingResponse> {
    return pipe(
      this.bookingService.createBooking(body.reservationId),
      TE.map((result) => ({
        id: result.id,
        userId: result.user.id,
        tourId: result.tour.id,
        seatsBooked: result.seatsBooked,
        bookingDate: result.bookingDate,
        totalPrice: result.totalPrice,
        paymentStatus: result.paymentStatus,
      })),
      TEmapLeftToHttpError,
      TEThrowIfError
    )();
  }
}
