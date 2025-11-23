import winston from "winston";
import "winston-daily-rotate-file";
import MSSQLErrorTransport from "./dbTransport.js";

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const logger = winston.createLogger({
  level: "http",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    // new winston.transports.Console(),
    fileRotateTransport,
    new MSSQLErrorTransport()
  ]
});

export default logger;
