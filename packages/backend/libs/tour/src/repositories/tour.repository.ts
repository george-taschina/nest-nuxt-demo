import {
  EntityRepository,
  LockMode,
  OptimisticLockError,
} from '@mikro-orm/mysql';
import * as TE from 'fp-ts/TaskEither';
import { Tour } from '@has-george-read-backend/tour/models/tour.entity';
import {
  DatabaseError,
  LockError,
} from '@has-george-read-backend/core/types/errors';
import moment from 'moment';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

export class TourRepository extends EntityRepository<Tour> {
  public findById(
    tourId: string
  ): TE.TaskEither<DatabaseError, O.Option<Tour>> {
    return pipe(
      TE.tryCatch(
        () => {
          return this.findOne({
            id: tourId,
          });
        },
        (cause) => {
          return new DatabaseError('Error getting tours', { cause });
        }
      ),
      TE.map((result) => O.fromNullable(result))
    );
  }

  public lockAndUpdateById(
    tourId: string,
    expectedVersion: number
  ): TE.TaskEither<DatabaseError | LockError, Tour> {
    return pipe(
      TE.tryCatch(
        async () => {
          const tour = await this.findOneOrFail({
            id: tourId,
          });
          await this.em.lock(tour, LockMode.OPTIMISTIC, expectedVersion);

          tour.updatedAt = new Date();

          await this.em.flush();

          return tour;
        },
        (cause) => {
          if (cause instanceof OptimisticLockError) {
            return new LockError('This tour has already been locked, retry.', {
              cause,
            });
          }
          return new DatabaseError('Error in locking tour', { cause });
        }
      )
    );
  }

  public getAvailableTours(): TE.TaskEither<DatabaseError, Tour[]> {
    return TE.tryCatch(
      () => {
        return this.find(
          {
            startingDate: {
              $gte: moment().startOf('day').toDate(),
            },
          },
          {
            populate: ['bookings', 'reservations'],
          }
        );
      },
      (cause) => {
        return new DatabaseError('Error getting tours', { cause });
      }
    );
  }
}
