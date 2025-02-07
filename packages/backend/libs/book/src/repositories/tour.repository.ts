import { EntityRepository } from '@mikro-orm/mysql';
import * as TE from 'fp-ts/TaskEither';
import { Tour } from '@has-george-read-backend/book/models/tour.entity';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';

export class TourRepository extends EntityRepository<Tour> {
  public findAllNotDeleted(): TE.TaskEither<DatabaseError, Tour[]> {
    return TE.tryCatch(
      () => {
        return this.findAll();
      },
      (cause) => {
        console.debug('Error getting tours', cause);
        return new DatabaseError('Error getting tours', { cause });
      }
    );
  }
}
