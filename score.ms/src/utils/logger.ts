import { createLogger as winstonCreateLogger, format, transports } from 'winston';

export const createLogger = async (appName: string) => {
  return winstonCreateLogger({
    level: 'info',
    defaultMeta: { appName },
    format: format.combine(
      format.timestamp(),
      format.printf(({ level, message, timestamp, ...meta }) => {
        const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        return `[${appName}][${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`;
      })
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/app.log' }),
    ],
  });
}