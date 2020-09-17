import * as winston from 'winston';

const conoleLogTransport = new winston.transports.Console();

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [conoleLogTransport],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}
export default class Logger {
  public static info(info: any) {
    logger.info(info);
  }

  public static debug(message: any) {
    logger.debug(message);
  }

  public static error(err: any) {
    logger.error(err);
  }

  public static warning(warning: any) {
    logger.warn(warning);
  }
}
