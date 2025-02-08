import { EntityRepository } from '@mikro-orm/mysql';
import * as TE from 'fp-ts/TaskEither';
import { Tour } from '@has-george-read-backend/tour/models/tour.entity';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';
import moment from 'moment';

export class TourRepository extends EntityRepository<Tour> {
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
