import { EntityRepository } from '@mikro-orm/mysql';
import { User } from '@nest-nuxt-demo-backend/tour/models/user.entity';
import * as TE from 'fp-ts/TaskEither';
import { DatabaseError } from '@nest-nuxt-demo-backend/core/types/errors';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

export class UserRepository extends EntityRepository<User> {
  public findUserByEmail(
    email: string
  ): TE.TaskEither<DatabaseError, O.Option<User>> {
    return pipe(
      TE.tryCatch(
        () => {
          return this.findOne({
            email: email,
          });
        },
        (cause) => {
          return new DatabaseError('Error getting User', { cause });
        }
      ),
      TE.map((result) => O.fromNullable(result))
    );
  }

  public createUser(email: string): TE.TaskEither<DatabaseError, User> {
    return TE.tryCatch(
      async () => {
        const user = new User({
          email,
        });
        await this.em.persistAndFlush(user);

        return user;
      },
      (cause) => {
        return new DatabaseError('Error creating User', { cause });
      }
    );
  }
}
