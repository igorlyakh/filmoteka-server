import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  const levelText = level === 'error' ? '[SERVER ERROR]'.red : '[SERVER LOG]'.green;
  return `${levelText}  - ${timestamp}     ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MM-YYYY, HH:mm:ss',
    }),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: 'DD.MM.YYYY, HH:mm:ss',
        }),
        customFormat
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'app.log'),
      level: 'info',
    }),
  ],
});

export default logger;
