import { createLogger, format, transports } from "winston";
export const Logger = createLogger({
    level: "warn",
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "app.log",
            maxsize: 5242880,
            maxFiles: 5,
            tailable: true,
        }),
    ],
});
