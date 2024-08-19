/* Server Exceptions */

import { ServerErrorStatusCode, ClientErrorStatusCode, StatusCode } from "hono/utils/http-status";

export class Exception extends Error {
  code: StatusCode;
  /**
   * @param message
   * @param code
   */
  constructor(message = "Instagram Exception", code: StatusCode) {
    super(message);
    this.code = code;
  }
}

export class BadRequest extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Bad Request", code = 400 as ClientErrorStatusCode) {
    super(message, code);
  }
}

export class ServerException extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Internal Server Error", code = 500 as ServerErrorStatusCode) {
    super(message, code);
  }
}

export class NewsError extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Internal Error in News SDK", code = 500 as ServerErrorStatusCode) {
    super(message, code);
  }
}

export class RatelimitException extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Too many requests, try again later.", code = 429 as ClientErrorStatusCode) {
    super(message, code);
  }
}

export class TimeoutException extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Request timeout, please try again.", code = 408 as ClientErrorStatusCode) {
    super(message, code);
  }
}
