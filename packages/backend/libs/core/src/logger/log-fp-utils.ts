import { ApplicationExtendedException } from './../types/errors';
import { GeorgeLogger, LogContext } from './george.logger';
import * as IO from 'fp-ts/IO';
import * as TE from 'fp-ts/TaskEither';

export const teLoggerFactory = (logger: GeorgeLogger) => ({
  log: (message: string): TE.TaskEither<never, void> =>
    TE.fromIO(() => logger.log(message)),
  warnWithReport: (
    message: string,
    meta?: LogContext,
    context?: string
  ): TE.TaskEither<never, void> =>
    TE.fromIO(() => logger.warnWithReport(message, meta, context)),
});

export const ioLoggerFactory = (logger: GeorgeLogger) => ({
  log:
    (message: string): IO.IO<void> =>
    () =>
      logger.log(message),
  warn:
    (
      message: string | Record<string, unknown>,
      meta?: LogContext,
      context?: string
    ): IO.IO<void> =>
    () =>
      logger.warn(message, meta, context),

  warnWithReport:
    (message: string, meta?: LogContext, context?: string): IO.IO<void> =>
    () =>
      logger.warnWithReport(message, meta, context),

  exception:
    (
      message: string,
      error?: ApplicationExtendedException | unknown,
      meta?: LogContext,
      context?: string
    ): IO.IO<void> =>
    () =>
      logger.exception(message, error, meta, context),

  debug:
    (
      message: string | Record<string, unknown>,
      meta?: LogContext,
      context?: string
    ): IO.IO<void> =>
    () =>
      logger.debug(message, meta, context),
});

export type IOLogger = ReturnType<typeof ioLoggerFactory>;
export type TELogger = ReturnType<typeof teLoggerFactory>;
