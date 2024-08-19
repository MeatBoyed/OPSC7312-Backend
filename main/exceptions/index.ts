import { HTTPException } from "hono/http-exception";
import { Exception, NewsError } from "./server";
import { makeErrorResponse } from "@/lib/utils";

export const handleError = (error: any) => {
  if (error instanceof Exception) {
    const errorResponse = makeErrorResponse(error.message);
    return new HTTPException(error.code || 500, { message: errorResponse.message, cause: errorResponse });
  }

  console.error(error);
  const errorResponse = makeErrorResponse("Internal Server Error");
  return new HTTPException(error.code || 500, { message: errorResponse.message, cause: errorResponse });
};

// Handle News SDK errors
export const handleNewsError = (error: any) => {
  // Handle Normal errors
  if (error instanceof NewsError) {
    const errorResponse = makeErrorResponse(error.message);
    return new NewsError(errorResponse.message, 500);
  }

  const errorResponse = makeErrorResponse(error.message);
  return new NewsError(errorResponse.message, 500);
};
