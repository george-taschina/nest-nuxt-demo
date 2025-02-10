import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {
  TEmapLeftToHttpError,
  TEThrowIfError,
} from '@has-george-read-backend/core/controllers/controller-utils';

import { pipe } from 'fp-ts/function';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiPreconditionFailedResponse,
} from '@nestjs/swagger';
import { ReservationService } from '../services/reservations.service';
import { UserService } from '../services/user.service';
import { Reservation } from '../models/reservation.entity';
import {
  CreateReservationDto,
  RESERVATION_CREATE_REQUEST_SCHEMA,
} from '../documentation/create-reservation';
import * as TE from 'fp-ts/TaskEither';

@Controller('reservations')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly userService: UserService
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a reservation',
    description: 'Create a reservation by receiving a user Email and Tour ID',
  })
  @ApiBody({
    description: 'Reservation creation data',
    schema: RESERVATION_CREATE_REQUEST_SCHEMA,
  })
  @ApiOkResponse({
    description: 'Successfully reserved',
    type: Reservation,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiPreconditionFailedResponse({
    description: 'Race Condition Error',
  })
  @ApiConflictResponse({
    description: 'All seats have already been reserved or booked',
  })
  async save(
    @Body(new ValidationPipe())
    body: CreateReservationDto
  ): Promise<Reservation> {
    return pipe(
      TE.Do,
      TE.bind('user', () =>
        this.userService.findOrCreateUserByEmail(body.email)
      ),
      TE.flatMap(({ user }) => {
        const result = this.reservationService.reserveSeats(
          body.tourId,
          user.id,
          body.numberOfSeats
        );
        return result;
      }),
      TEmapLeftToHttpError,
      TEThrowIfError
    )();
  }
}
