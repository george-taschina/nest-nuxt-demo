import { EntityRepository } from '@mikro-orm/mysql';
import * as TE from 'fp-ts/TaskEither';
import { Book } from '@has-george-read-backend/book/models/book.entity';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';

export class BookRepository extends EntityRepository<Book> {
  public findAllNotDeleted(): TE.TaskEither<DatabaseError, Book[]> {
    return TE.tryCatch(
      () => {
        return this.findAll();
      },
      (cause) => {
        console.debug('Error getting books', cause);
        return new DatabaseError('Error getting books', { cause });
      }
    );
  }
}
