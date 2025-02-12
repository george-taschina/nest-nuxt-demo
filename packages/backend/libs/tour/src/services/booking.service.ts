import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import {
  DatabaseError,
  ForbiddenError,
  NotFoundError,
} from '@has-george-read-backend/core/types/errors';
import { BookingRepository } from '../repositories/booking.repository';
import { Booking } from '../models/booking.entity';
import { ReservationService } from './reservations.service';
import { pipe } from 'fp-ts/lib/function';

@Injectable()
export class BookingService extends BaseService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly reservationService: ReservationService
  ) {
    super();
  }

  public createBooking(
    reservationId: string
  ): TE.TaskEither<NotFoundError | DatabaseError | ForbiddenError, Booking> {
    return pipe(
      TE.Do,
      TE.bindW('reservation', () =>
        this.reservationService.getByIdOrFail(reservationId)
      ),
      TE.filterOrElseW(
        ({ reservation }) => !reservation.isExpired,
        () => new ForbiddenError('The reservation has expired.')
      ),
      TE.bindW('booking', ({ reservation }) =>
        this.bookingRepository.createBooking({
          seatsBooked: reservation.seatsReserved,
          userId: reservation.user.id,
          totalPrice: reservation.seatsReserved * reservation.tour.price,
          tourId: reservation.tour.id,
        })
      ),
      TE.tapIO(() => this.reservationService.cancelReservation(reservationId)),
      TE.map(({ booking }) => booking)
    );
  }
}
