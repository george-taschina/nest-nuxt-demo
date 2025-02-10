import { EntityRepository } from '@mikro-orm/mysql';
import { Reservation } from '@has-george-read-backend/tour/models/reservation.entity';
import * as TE from 'fp-ts/TaskEither';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';
import { User } from '../models/user.entity';
import { Tour } from '../models/tour.entity';
import moment from 'moment';

export class ReservationRepository extends EntityRepository<Reservation> {
  public reserveSeats(
    tourId: string,
    userId: string,
    numberOfSeats: number,
    secondsToReserve: number
  ): TE.TaskEither<DatabaseError, Reservation> {
    return TE.tryCatch(
      async () => {
        const reservation = new Reservation({
          user: this.em.getReference(User, userId),
          tour: this.em.getReference(Tour, tourId),
          expiresAt: moment().add(secondsToReserve, 'seconds').toDate(),
          seatsReserved: numberOfSeats,
        });
        this.em.persist(reservation);

        return reservation;
      },
      (cause) => {
        console.debug(cause);
        return new DatabaseError('Error creating Reservation', { cause });
      }
    );
  }

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
