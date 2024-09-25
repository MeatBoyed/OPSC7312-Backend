/**
 * Handles the Business logic and implementation of the API
 * Handles Querying to News SDK (Repository)
 * Handles Querying to Firebase
 *
 *
 * Handles converting data into a Success Response object
 * Handles creating respective HTTP Exceptions
 */
import { handleAPIError, makeAPIError } from "@/exceptions";
import NewsRepository from "../news";
import { makeSuccessNewsResponse } from "../utils";
import { HTTPException } from "hono/http-exception";
import { Article, SuccessNewsResponse } from "@/schemas";
import { Err, Ok, Result } from "ts-results";
import { z } from "zod";

/**
 * Interface for the Business Layer.
 *
 * Returns a Success Response on Success.
 * Returns an HTTP Exception on Error
 * @interface IBusinessService
 */
export default class BusinessService {
  // The response type uses a Rust implementation of handling errors (errors should always be a value)
  static async getArticlesByTitle(
    title: string
  ): Promise<Result<SuccessNewsResponse, HTTPException>> {
    const article = await NewsRepository.getArticleByTitle(title);
    if (article.err)
      // Handling the error as a value, and bubbling up the info to the caller for debugging, while keeping data privacy.
      return Err(handleAPIError(article.val.cause, article.val.code, article.val.message));

    return Ok(makeSuccessNewsResponse([article.val]));
  }

  static async getArticles(
    limit?: number,
    offset?: number,
    category?: string
  ): Promise<Result<SuccessNewsResponse, HTTPException>> {
    let response: Article[];

    // Category filtering implementation
    if (category) {
      const res = await NewsRepository.getArticlesByCategory(category);
      if (res.err) return Err(handleAPIError(res.val.cause, res.val.code, res.val.message));
      response = res.val;
    } else {
      const res = await NewsRepository.getArticles();
      if (res.err) return Err(handleAPIError(res.val.cause, res.val.code, res.val.message));
      response = res.val;
    }

    // Handle an Empty Response
    if (response.length === 0)
      return Err(makeAPIError(404, "No articles found, please try again."));

    // Limit Implementation
    if (limit && response.length > limit) response = response.slice(offset, limit);

    // Offset Implementation
    if (offset && offset > 0) response = response.slice(offset);

    return Ok(makeSuccessNewsResponse(response));
  }
}
