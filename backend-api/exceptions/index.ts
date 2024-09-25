import { HTTPException } from "hono/http-exception";
import { Exception, NewsError } from "./server";
import { makeErrorResponse } from "@/lib/utils";
import { ErrorNewsResponse } from "@/schemas";
import { ServerErrorStatusCode, StatusCode } from "hono/utils/http-status";

export const handleAPIError = (error: any, status?: StatusCode, message?: string) => {
  if (error instanceof Exception) {
    const errorResponse = makeErrorResponse(error.message);
    return new HTTPException(error.code || status, {
      message: errorResponse.message,
      cause: errorResponse,
    });
  }
  const errorResponse = makeErrorResponse(message || "Internal Server Error");
  return new HTTPException(error.code || status, {
    message: errorResponse.message,
    cause: errorResponse,
  });
};

// Handle News SDK errors
export const handleNewsError = (error: any, code?: StatusCode, message?: string) => {
  if (error instanceof NewsError) {
    return error;
  }

  if (error instanceof Exception) {
    const errorResponse = makeErrorResponse(error.message);
    return new NewsError(message || errorResponse.message, code || 500);
  }

  return new NewsError(message, code || 500);
};

export const makeAPIError = (status: StatusCode, message: string) => {
  return handleAPIError(new Error(message), status, message);
};
