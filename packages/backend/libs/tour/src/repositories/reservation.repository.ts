import { EntityRepository } from '@mikro-orm/mysql';
import { Reservation } from '@nest-nuxt-demo-backend/tour/models/reservation.entity';
import * as TE from 'fp-ts/TaskEither';
import { DatabaseError } from '@nest-nuxt-demo-backend/core/types/errors';
import { User } from '../models/user.entity';
import { Tour } from '../models/tour.entity';
import moment from 'moment';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

export class ReservationRepository extends EntityRepository<Reservation> {
  public cancelReservation(
    reservationId: string
  ): TE.TaskEither<DatabaseError, number> {
    return TE.tryCatch(
      () => {
        return this.nativeDelete({
          id: reservationId,
        });
      },
      (cause) => {
        return new DatabaseError('Error deleting reservation', { cause });
      }
    );
  }
  public getById(
    reservationId: string
  ): TE.TaskEither<DatabaseError, O.Option<Reservation>> {
    return pipe(
      TE.tryCatch(
        () => {
          return this.findOne(
            {
              id: reservationId,
            },
            {
              populate: ['tour'],
            }
          );
        },
        (cause) => {
          return new DatabaseError('Error getting reservation', { cause });
        }
      ),
      TE.map((result) => O.fromNullable(result))
    );
  }

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
}
