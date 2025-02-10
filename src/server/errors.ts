export class HttpError extends Error {
  code: number;
  constructor({ message, code }: { message: string; code: number }) {
    super(message);
    this.code = code;
  }
}

export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super({ message: message ?? "Not Found", code: 404 });
  }
}

export class ServerError extends HttpError {
  constructor(message?: string) {
    super({ message: message ?? "Server Error", code: 500 });
  }
}
