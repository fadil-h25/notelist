export class ResponseError extends Error {
  statusCode: number;
  message: string;
  path?: string;

  constructor(statusCode: number, message: string, path?: string) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.path = path;
  }
}
