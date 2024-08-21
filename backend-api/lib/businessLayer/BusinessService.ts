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
import { makeArticlesResponse, makeErrorNewsResponse, makeSuccessNewsResponse } from "../utils";
import { HTTPException } from "hono/http-exception";
import { ErrorNewsResponse, SuccessNewsResponse } from "@/schemas";
import { NewsError } from "@/exceptions/server";

/**
 * Interface for the Business Layer.
 *
 * Returns a Success Response on Success.
 * Returns an HTTP Exception on Error
 * @interface IBusinessService
 */
export default class BusinessService implements IBusinessService {
  private newsRepository: NewsRepository;

  constructor() {
    this.newsRepository = new NewsRepository();
  }

  async getArticles() {
    try {
      const articles = await this.newsRepository.getArticles();

      if (articles.length === 0) return makeAPIError(404, "No articles found, please try again.");
      return makeSuccessNewsResponse(articles);
    } catch (error) {
      console.log("Business Service Error, getArticles: ", error);
      return handleAPIError(error);
    }
  }

  async getArticlesByTitle(title: string) {
    try {
      const article = await this.newsRepository.getArticleByTitle(title);
      return makeSuccessNewsResponse([article]);
    } catch (error) {
      console.log("Business Service Error, getArticlesByTitle: ", error);
      if (error instanceof NewsError) {
        return makeAPIError(error.code, error.message);
      }
      return handleAPIError(error);
    }
  }
}

// Bussiness Service Interface
interface IBusinessService {
  getArticles(): Promise<SuccessNewsResponse | HTTPException>;
  getArticlesByTitle(title: string): Promise<SuccessNewsResponse | HTTPException>;
}
