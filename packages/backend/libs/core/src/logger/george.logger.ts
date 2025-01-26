import { getExtraLoggingInfo } from '@has-george-read-backend/core/logger/get-extra-logging-info';
import * as Sentry from '@sentry/node';
import { Logger } from '@nestjs/common';
import { ApplicationExtendedException, InternalError } from '../types/errors';

export type LogMetadata = Record<string, unknown>;
export type LogContext = Record<string, LogMetadata>;

export class GeorgeLogger {
  private readonly logger: Logger;

  constructor(name: string) {
    this.logger = new Logger(name);
  }

  public debug(
    message: string | Record<string, unknown>,
    meta?: LogMetadata,
    context?: string
  ): void {
    this.logger.debug(this.getWinstonMessage(message, meta), context);
  }

  public log(
    message: string | Record<string, unknown>,
    meta?: LogMetadata,
    context?: string
  ): void {
    this.logger.log(this.getWinstonMessage(message, meta), context);
  }

  public logWithReport(
    message: string,
    meta?: LogContext,
    context?: string
  ): void {
    const extra = getExtraLoggingInfo();
    Sentry.captureMessage(message, {
      level: 'info',
      contexts: { ...meta, extra },
      tags: extra,
    });
    this.log(message, meta, context);
  }

  public warn(
    message: string | Record<string, unknown>,
    meta?: LogMetadata,
    context?: string
  ): void {
    this.logger.warn(this.getWinstonMessage(message, meta), context);
  }

  public warnWithReport(
    message: string,
    meta?: LogContext,
    context?: string
  ): void {
    const extra = getExtraLoggingInfo();
    Sentry.captureMessage(message, {
      level: 'warning',
      contexts: { ...meta, extra },
      tags: extra,
    });
    this.warn(message, meta, context);
  }

  public error(
    message: string | Error | Record<string, unknown>,
    trace?: string,
    meta?: LogMetadata,
    context?: string
  ): void {
    const currentTrace: string | undefined =
      !trace && message instanceof Error ? message.stack : trace;
    const extra = getExtraLoggingInfo();
    Sentry.captureException(message, {
      contexts: { ...meta, extra },
      tags: extra,
    });
    const msg = this.createErrorMessage(message);
    this.logger.error(this.getWinstonMessage(msg, meta), currentTrace, context);
  }

  public errorWithoutReport(
    message: string | Error | Record<string, unknown>,
    trace?: string,
    meta?: LogMetadata,
    context?: string
  ): void {
    const currentTrace: string | undefined =
      !trace && message instanceof Error ? message.stack : trace;
    const msg = this.createErrorMessage(message);
    this.logger.error(this.getWinstonMessage(msg, meta), currentTrace, context);
  }

  public exception(
    message: string,
    error?: ApplicationExtendedException | unknown,
    meta?: LogContext,
    context?: string
  ): void {
    const cError = new InternalError(message, error);
    const extra = getExtraLoggingInfo();

    Sentry.captureException(cError, {
      contexts: { ...meta, extra },
      tags: extra,
    });

    this.logger.error(
      this.getWinstonMessage(message, meta),
      cError.stack,
      context
    );
  }

  private getWinstonMessage(
    message: string | Record<string, unknown>,
    meta?: LogContext | LogMetadata
  ) {
    const enrichedMeta = this.enrichMeta(meta);
    return enrichedMeta
      ? { message: JSON.stringify(message), ...enrichedMeta }
      : message;
  }

  private createErrorMessage = (
    message: string | Error | Record<string, unknown>
  ) =>
    message instanceof Error ? `[${message.name}] ${message.message}` : message;

  private enrichMeta = (
    meta?: LogContext | LogMetadata
  ): LogContext | LogMetadata | undefined => {
    const extra = getExtraLoggingInfo();

    return meta || extra
      ? {
          ...meta,
          ...extra,
        }
      : undefined;
  };
}
