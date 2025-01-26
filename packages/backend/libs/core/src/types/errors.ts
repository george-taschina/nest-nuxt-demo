import { Errors } from 'io-ts';
import { formatValidationErrors } from 'io-ts-reporters';

export type ErrorOptionWithCode = ErrorOptions & { code?: string };

export const fve = (errors: Errors) =>
  formatValidationErrors(errors).join(', ');

const isErrorOptionWithCode = (
  options: unknown
): options is ErrorOptionWithCode =>
  typeof options === 'object' &&
  !(options instanceof Error) &&
  options !== null &&
  ('cause' in options || 'code' in options);

export abstract class ApplicationException extends Error {
  public code?: string;
  constructor(message: string, options?: ErrorOptionWithCode) {
    super(message, options);
    this.name = this.constructor.name;
    this.code = options && options.code;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export class ApplicationExtendedException extends ApplicationException {
  constructor(
    message: string,
    errorOption?: ErrorOptionWithCode | Error | unknown
  ) {
    const opt = isErrorOptionWithCode(errorOption)
      ? errorOption
      : { cause: errorOption };

    super(message, opt);
    const messageLines = (this.message.match(/\n/g) || []).length + 1;

    this.stack = this.stack
      ?.split('\n')
      .slice(0, messageLines + 1)
      .join('\n');

    if (opt.cause && opt.cause instanceof Error) {
      this.stack += '\n' + opt.cause.stack;
    } else if (opt.cause) {
      try {
        this.stack += '\n' + JSON.stringify(opt.cause);
      } catch {
        this.stack += 'Not parsable inner error' + opt.cause;
      }
    }
  }
}

export class InternalError extends ApplicationExtendedException {
  private _internalError = 'internalError' as const;

  public get tag(): 'internalError' {
    return this._internalError;
  }
}

export class UserError extends ApplicationExtendedException {
  private _userError = 'userError' as const;

  public get tag(): 'userError' {
    return this._userError;
  }
}

export class ForbiddenError extends ApplicationExtendedException {
  private _forbiddenError = 'forbiddenError' as const;

  public get tag(): 'forbiddenError' {
    return this._forbiddenError;
  }
}

export class ValidationError extends ApplicationExtendedException {
  private _validationError = 'validationError' as const;

  public get tag(): 'validationError' {
    return this._validationError;
  }
}

export class NotFoundError extends ApplicationExtendedException {
  private _notFoundError = 'notFoundError' as const;

  public get tag(): 'notFoundError' {
    return this._notFoundError;
  }
}

export class DatabaseError extends ApplicationExtendedException {
  private _databaseError = 'databaseError' as const;

  public get tag(): 'databaseError' {
    return this._databaseError;
  }
}

export class IntegrationError extends ApplicationExtendedException {
  private _integrationError = 'integrationError' as const;

  public get tag(): 'integrationError' {
    return this._integrationError;
  }
}

export class MappingError extends ApplicationExtendedException {
  private _mappingError = 'mappingError' as const;

  public get tag(): 'mappingError' {
    return this._mappingError;
  }
}
