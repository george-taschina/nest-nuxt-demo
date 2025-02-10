import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.entity';

@Injectable()
export class UserService extends BaseService {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  public findOrCreateUserByEmail(
    email: string
  ): TE.TaskEither<DatabaseError, User> {
    return pipe(
      this.userRepository.findUserByEmail(email),
      TE.flatMap((result) =>
        O.isSome(result)
          ? TE.of(result.value)
          : this.userRepository.createUser(email)
      )
    );
  }
}
