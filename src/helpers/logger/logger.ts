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

export default logger;
