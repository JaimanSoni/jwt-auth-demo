interface APIResponseType<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

class APIResponse<T> implements APIResponseType<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: T, message = "Success") {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export { APIResponse, APIResponseType };
