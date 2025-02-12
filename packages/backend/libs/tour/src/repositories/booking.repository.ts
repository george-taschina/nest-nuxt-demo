import { EntityRepository } from '@mikro-orm/mysql';
import { Booking } from '@has-george-read-backend/tour/models/booking.entity';
import * as TE from 'fp-ts/TaskEither';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';
import { User } from '../models/user.entity';
import { Tour } from '../models/tour.entity';

export interface CreateBooking {
  tourId: string;
  userId: string;
  seatsBooked: number;
  totalPrice: number;
}

export class BookingRepository extends EntityRepository<Booking> {
  public createBooking(
    bookingRequest: CreateBooking
  ): TE.TaskEither<DatabaseError, Booking> {
    return TE.tryCatch(
      async () => {
        const booking = new Booking({
          user: this.em.getReference(User, bookingRequest.userId),
          tour: this.em.getReference(Tour, bookingRequest.tourId),
          bookingDate: new Date(),
          seatsBooked: bookingRequest.seatsBooked,
          totalPrice: bookingRequest.totalPrice,
          paymentStatus: 'completed',
        });
        this.em.persistAndFlush(booking);

        return booking;
      },
      (cause) => {
        console.debug(cause);
        return new DatabaseError('Error creating Booking', { cause });
      }
    );
  }
}
