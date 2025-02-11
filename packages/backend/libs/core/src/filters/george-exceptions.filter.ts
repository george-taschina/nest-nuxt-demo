import { BaseExceptionFilter } from '@nestjs/core';
import { GeorgeLogger, LogContext } from '../logger/george.logger';
import { ArgumentsHost, HttpException } from '@nestjs/common';
import { getExtraLoggingInfo } from '../logger/get-extra-logging-info';
import * as Sentry from '@sentry/node';

export class GeorgeExceptionFilter extends BaseExceptionFilter {
  logger: GeorgeLogger;

  constructor() {
    super();
    this.logger = new GeorgeLogger('GeorgeExceptionsFilter');
  }

  catch(exception: Error, host: ArgumentsHost) {
    this.catchHttp.bind(this)(exception, host);
  }

  catchHttp(exception: unknown, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const type = host.getType();
    const response = http.getResponse();

    const metadata: LogContext = {
      response: {
        statusCode: response && response.statusCode,
        statusMessage: response && response.statusMessage,
      },
    };

    const tags = {
      transaction_type: type,
      ...getExtraLoggingInfo(),
    };

    if (!(exception instanceof Error)) {
      // To catch all not Error exception
      Sentry.captureMessage('Non Error based error', {
        level: 'error',
        contexts: {
          exception: { exception },
          ...metadata,
          extra: getExtraLoggingInfo(),
        },
      });

      this.logger.error('Non Error based error', undefined, {
        contexts: {
          exception: { exception },
          ...metadata,
          extra: getExtraLoggingInfo(),
        },
        tags,
      });
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
      return;
    }

    if (exception instanceof HttpException && exception.getStatus() < 500) {
      super.catch(exception, host);
      return;
    }

    if (exception instanceof HttpException && exception.getStatus() >= 500) {
      this.logger.errorWithoutReport(
        exception,
        undefined,
        {
          cause: exception.cause,
          causeStack:
            exception.cause instanceof Error
              ? exception.cause?.stack
              : undefined,
          ...metadata,
          response: {
            response: exception.getResponse(),
            status: exception.getStatus(),
            message: exception.message,
          },
        },
        'HttpExceptionHandler'
      );

      Sentry.captureException(exception, {
        level: 'error',
        contexts: {
          ...metadata,
          extra: getExtraLoggingInfo(),
          cause: {
            message:
              exception.cause instanceof Error
                ? exception.cause?.message
                : undefined,
          },
        },
        tags,
      });
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    this.logger.errorWithoutReport(
      exception,
      undefined,
      {
        ...metadata,
      },
      'HttpExceptionHandler'
    );
    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
    Sentry.captureException(exception, {
      level: 'error',
      contexts: { ...metadata, extra: getExtraLoggingInfo() },
      tags,
    });
  }
}
