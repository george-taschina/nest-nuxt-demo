import {
  EntityRepository,
  LockMode,
  OptimisticLockError,
} from '@mikro-orm/mysql';
import * as TE from 'fp-ts/TaskEither';
import { Tour } from '@nest-nuxt-demo-backend/tour/models/tour.entity';
import {
  DatabaseError,
  LockError,
} from '@nest-nuxt-demo-backend/core/types/errors';
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
          const em = this.em.fork();
          return em.findOne(
            Tour,
            {
              id: tourId,
            },
            {
              populate: ['bookings', 'reservations'],
            }
          );
        },
        (cause) => {
          return new DatabaseError('Error getting tour in findById', {
            cause,
          });
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
          await this.em.begin();

          const tour = await this.em.findOneOrFail(Tour, {
            id: tourId,
          });
          await this.em.lock(tour, LockMode.OPTIMISTIC, expectedVersion);

          tour.updatedAt = new Date();

          await this.em.commit();

          return tour;
        },
        (cause) => {
          if (cause instanceof OptimisticLockError) {
            this.em.rollback();
            return new LockError('This tour has already been locked, retry.', {
              cause,
            });
          }
          this.em.rollback();
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
