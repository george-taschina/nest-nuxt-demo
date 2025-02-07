import { EntityRepository } from '@mikro-orm/mysql';
import * as TE from 'fp-ts/TaskEither';
import { Tour } from '@has-george-read-backend/tour/models/tour.entity';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';

export class TourRepository extends EntityRepository<Tour> {
  public search(): TE.TaskEither<DatabaseError, Tour[]> {
    return TE.tryCatch(
      () => {
        return this.findAll();
      },
      (cause) => {
        return new DatabaseError('Error getting tours', { cause });
      }
    );
  }
}
