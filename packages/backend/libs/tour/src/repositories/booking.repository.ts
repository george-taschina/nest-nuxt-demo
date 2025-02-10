import { EntityRepository } from '@mikro-orm/mysql';
import { Booking } from '@has-george-read-backend/tour/models/booking.entity';
import * as TE from 'fp-ts/TaskEither';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';

export class BookingRepository extends EntityRepository<Booking> {
  public getPendingOrCompletedBookingsByTourId(
    tourId: string
  ): TE.TaskEither<DatabaseError, Booking[]> {
    return TE.tryCatch(
      () => {
        return this.find({
          tour: tourId,
          paymentStatus: {
            $in: ['pending', 'completed'],
          },
        });
      },
      (cause) => {
        return new DatabaseError('Error getting bookings', { cause });
      }
    );
  }
}
