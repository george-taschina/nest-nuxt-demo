import { EntityRepository } from '@mikro-orm/mysql';
import { Reservation } from '@has-george-read-backend/tour/models/reservation.entity';
import * as TE from 'fp-ts/TaskEither';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';

export class ReservationRepository extends EntityRepository<Reservation> {
  public getReservationsByTourId(
    tourId: string
  ): TE.TaskEither<DatabaseError, Reservation[]> {
    return TE.tryCatch(
      () => {
        return this.find({
          tour: tourId,
          expiresAt: {
            $gte: new Date(),
          },
        });
      },
      (cause) => {
        return new DatabaseError('Error getting reservations', { cause });
      }
    );
  }
}
