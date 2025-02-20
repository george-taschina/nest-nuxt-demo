import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import {
  ApplicationExtendedException,
  ConflictError,
  DatabaseError,
  ForbiddenError,
  IntegrationError,
  InternalError,
  MappingError,
  NotFoundError,
  LockError,
  UserError,
  ValidationError,
} from '../types/errors';
import georgeContext from '../utils/george-context';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import { pipe } from 'fp-ts/function';

const getCurrentTransaction = (): string | undefined =>
  (georgeContext.getStore() as Map<string, string>)?.get('transactionId');

const mapErrorToHttpError = (
  error:
    | ValidationError
    | NotFoundError
    | MappingError
    | DatabaseError
    | ForbiddenError
    | InternalError
    | IntegrationError
    | HttpException
    | UserError
    | ConflictError
    | LockError
): HttpException | ApplicationExtendedException => {
  if (error instanceof ValidationError) {
    return new BadRequestException(
      {
        statusCode: 400,
        message: [error.message],
        transactionId: getCurrentTransaction(),
        error: 'Bad Request',
      },
      { cause: error }
    );
  }

  if (error instanceof NotFoundError) {
    return new NotFoundException(
      {
        statusCode: 404,
        message: [error.message],
        transactionId: getCurrentTransaction(),
        error: 'Not Found',
      },
      { cause: error }
    );
  }

  if (error instanceof ForbiddenError) {
    return new ForbiddenException(
      {
        statusCode: 403,
        message: [error.message],
        transactionId: getCurrentTransaction(),
        error: 'Forbidden',
      },
      { cause: error }
    );
  }

  if (error instanceof ConflictError) {
    return new ConflictException(
      {
        statusCode: 409,
        message: [error.message],
        transactionId: getCurrentTransaction(),
        error: 'Conflict Error',
      },
      { cause: error }
    );
  }

  if (error instanceof LockError) {
    return new PreconditionFailedException(
      {
        statusCode: 412,
        message: [error.message],
        transactionId: getCurrentTransaction(),
        error: 'Lock Error',
      },
      { cause: error }
    );
  }

  return error;
};

export const TEmapLeftToHttpError = <
  E extends Parameters<typeof mapErrorToHttpError>[0],
  A,
>(
  fa: TE.TaskEither<E, A>
): TE.TaskEither<ReturnType<typeof mapErrorToHttpError>, A> =>
  pipe(fa, TE.mapLeft(mapErrorToHttpError));

export const TEThrowIfError = <E, A>(
  fa: TE.TaskEither<E, A>
): T.Task<A> | never =>
  pipe(
    fa,
    TE.getOrElse<E, A>((error) => {
      throw error;
    })
  );
