import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';
import { BookingRepository } from '../repositories/booking.repository';
import { Booking } from '../models/booking.entity';

@Injectable()
export class BookingService extends BaseService {
  constructor(private readonly bookingRepository: BookingRepository) {
    super();
  }

  public getPendingOrCompletedBookingsByTourId(
    tourId: string
  ): TE.TaskEither<DatabaseError, Booking[]> {
    return this.bookingRepository.getPendingOrCompletedBookingsByTourId(tourId);
  }
}
