import { DateUtils } from '../../../utils/date.utils';
import { JsonUtils } from '../../../utils/json.utils';
import { LoggerService } from '../logger.service';
import {
  LogData,
  LogEntry,
  LoggerOptions,
  LogSeverity,
} from '../types/logger.types';

export class GcpLoggerService implements LoggerService {
  constructor(private readonly options?: LoggerOptions) {}

  error(data: LogData, context?: string) {
    this._log('ERROR', data, context);
  }
  warn(data: LogData, context?: string) {
    this._log('WARNING', data, context);
  }
  debug(data: LogData, context?: string) {
    this._log('DEBUG', data, context);
  }
  verbose(data: LogData, context?: string) {
    this._log('ERROR', data, context);
  }
  log(data: LogData, context?: string) {
    this._log('INFO', data, context);
  }

  private _log(
    severity: LogSeverity,
    data: LogData,
    context: string = 'APPLICATION',
  ) {
    if (this.options?.disableLogging) {
      return;
    }

    this.logAsJson(severity, data, context);
  }

  private logAsJson(
    severity: LogSeverity,
    data: LogData,
    context: string = 'APPLICATION',
  ) {
    const metadata: LogEntry = {
      resource: {
        type: 'global',
      },
      severity,
      timestamp: DateUtils.utcISOString(),
    };

    let entry: any;

    if (typeof data === 'string') {
      entry = Object.assign({ ...metadata, message: data, service: context });
    } else {
      entry = Object.assign({
        ...data,
        ...metadata,
        service: context,
      });
    }

    console.log(JsonUtils.stringify(entry));
  }
}
