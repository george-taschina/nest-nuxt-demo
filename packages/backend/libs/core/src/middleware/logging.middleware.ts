import { Injectable, NestMiddleware } from '@nestjs/common';
import { BaseService } from '../services/base.service';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import requestIp from 'request-ip';
import { LogContext } from '../logger/george.logger';
import georgeContext from '../utils/george-context';

@Injectable()
export class LoggingMiddleware extends BaseService implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const startTimeStamp = Date.now();

    const transactionId = uuidv4();
    const store = new Map<string, string>();

    store.set('transactionId', transactionId);

    res.on('finish', () => {
      const time = Date.now() - startTimeStamp;
      const clientIp = requestIp.getClientIp(req);
      const metadata: LogContext = {
        environment: {
          remoteAddr: clientIp
            ? clientIp.toString().replace('::ffff:', '')
            : null,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
        },
      };

      const logMessage = `[Request ${req.method} ${req.url} ${res.statusCode} ${time}ms]`;

      if (res.statusCode >= 400 && res.statusCode < 500) {
        this.logger.warnWithReport(logMessage, metadata);
      } else if (res.statusCode >= 500) {
        this.logger.errorWithoutReport(logMessage, undefined, metadata);
      } else {
        this.logger.log(logMessage, metadata);
      }
    });
    georgeContext.run(store, next);
  }
}
