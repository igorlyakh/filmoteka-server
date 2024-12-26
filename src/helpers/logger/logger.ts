import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD, HH:mm:ss',
    }),
    winston.format.printf(info => {
      return `\n[SERVER LOG]  - ${info.timestamp}     ${info.message}`.magenta;
    })
  ),
  transports: [new winston.transports.Console()],
});

logger.add(
  new winston.transports.Console({
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD, HH:mm:ss',
      }),
      winston.format.printf(info => {
        return `\n[SERVER ERROR] - ${info.timestamp}     ${info.message}`.red;
      })
    ),
  })
);

logger.add(
  new winston.transports.File({
    filename: 'error.log',
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD, HH:mm:ss',
      }),
      winston.format.printf(info => {
        return `[SERVER ERROR] - ${info.timestamp}     ${info.message}`;
      })
    ),
  })
);

export default logger;
