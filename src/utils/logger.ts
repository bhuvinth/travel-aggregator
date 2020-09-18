const winston = require('winston');

const { format } = winston;

const conoleLogTransport = new winston.transports.Console();

const enumerateErrorFormat = format((info: any) => {
  if (info.message instanceof Error) {
    // eslint-disable-next-line no-param-reassign
    info.message = Object.assign(
      {
        message: info.message.message,
        stack: info.message.stack,
      },
      info.message,
    );
  }

  if (info instanceof Error) {
    return Object.assign(
      {
        message: info.message,
        stack: info.stack,
      },
      info,
    );
  }

  return info;
});

const logger = winston.createLogger({
  level: 'debug',
  format: format.combine(enumerateErrorFormat(), format.json()),
  defaultMeta: { service: 'flight-service' },
  transports: [conoleLogTransport],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
