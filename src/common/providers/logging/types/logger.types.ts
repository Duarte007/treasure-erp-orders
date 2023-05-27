export type LoggerOptions = {
  disableLogging?: boolean;
  disableStructuredLogging?: boolean;
};

export type LogSeverity =
  | 'DEFAULT'
  | 'DEBUG'
  | 'INFO'
  | 'NOTICE'
  | 'WARNING'
  | 'ERROR'
  | 'CRITICAL'
  | 'ALERT'
  | 'EMERGENCY';

export type LogData = string | any;

export type LogEntry = {
  resource: {
    type: string;
  };

  severity: LogSeverity;

  timestamp: string;
};
