import winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { isDev } from '@has-george-read-backend/core/utils/environments';
import { match } from 'ts-pattern';

export declare type WinstonLogLevel = 'info' | 'error' | 'warn' | 'debug' | '';

export const createLoggerModule = (name: string) => {
  const noColor = process.env.NO_COLOR !== undefined;
  const prettyPrint = isDev() && !noColor ? true : false;
  const colors = isDev() && !noColor ? true : false;

  const combine = [
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike(name, { prettyPrint, colors }),
  ];

  if (noColor) {
    combine.push(winston.format.uncolorize());
  }

  return WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(...combine),
      }),
    ],
  });
};

export const getLogLevel = (): WinstonLogLevel => {
  const level: string = (process.env.LOG_LEVEL || '').toUpperCase();
  return match(level)
    .with('DEBUG', () => 'debug')
    .with('INFO', () => 'info')
    .with('WARN', () => 'warn')
    .with('ERROR', () => 'error')
    .otherwise(() => '') as WinstonLogLevel;
};
