import HTTPStatus from 'http-status';

export class APISuccess<T = unknown> {
  readonly data: T;
  readonly status: number;
  readonly statusText: string;

  constructor(
    data: T,
    status: number = HTTPStatus.OK,
    statusText: string = HTTPStatus['200']
  ) {
    this.data = data;
    this.status = status;
    this.statusText = statusText;
  }

  jsonify() {
    return {
      status: this.status,
      statusText: this.statusText,
      data: this.data,
    };
  }
}

export class APIClientError extends Error {
  readonly error: Error;
  readonly status: number;
  readonly statusText: string;

  constructor(
    error: Error,
    status: number = HTTPStatus.BAD_REQUEST,
    statusText: string = HTTPStatus['400']
  ) {
    super(error.message);
    this.name = 'APIClientError';
    this.error = error;
    this.status = status;
    this.statusText = statusText;
  }

  jsonify() {
    return {
      name: this.name,
      status: this.status,
      statusText: this.statusText,
      error: this.error.message,
    };
  }
}
