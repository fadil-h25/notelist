export class ResponseError extends Error {
    statusCode;
    message;
    path;
    constructor(statusCode, message, path) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.path = path;
    }
}
