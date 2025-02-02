import { GeorgeLogger } from '../logger/george.logger';
import {
  IOLogger,
  ioLoggerFactory,
  TELogger,
  teLoggerFactory,
} from '../logger/log-fp-utils';

export class BaseService {
  private readonly _logger: GeorgeLogger;
  private readonly _ioLogger: IOLogger;
  private readonly _teLogger: TELogger;

  constructor() {
    this._logger = new GeorgeLogger(this.constructor.name);
    this._ioLogger = ioLoggerFactory(this.logger);
    this._teLogger = teLoggerFactory(this.logger);
  }

  protected get logger(): GeorgeLogger {
    return this._logger;
  }

  protected get ioLogger(): IOLogger {
    return this._ioLogger;
  }

  protected get teLogger(): TELogger {
    return this._teLogger;
  }
}
