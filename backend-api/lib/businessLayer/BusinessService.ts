/**
 * Handles the Business logic and implementation of the API
 * Handles Querying to News SDK (Repository)
 * Handles Querying to Firebase
 *
 *
 * Handles converting data into a Success Response object
 * Handles creating respective HTTP Exceptions
 */
import { handleError } from "@/exceptions";
import NewsRepository from "../news";
import { makeArticlesResponse } from "../utils";

/**
 * Interface for the Business Layer.
 *
 * Returns a Success Response on Success.
 * Returns an HTTP Exception on Error
 * @interface INewsRepository
 */
export default class BusinessService {
  private newsRepository: NewsRepository;

  constructor() {
    this.newsRepository = new NewsRepository();
  }

  async getArticles() {
    try {
      const articles = await this.newsRepository.getArticles();

      if (articles.length === 0) return makeArticlesResponse(articles, "No articles found, please try again.");
      return makeArticlesResponse(articles);
    } catch (error) {
      console.log("Business Service Error, getArticles: ", error);
      return handleError(error);
    }
  }

  async getArticlesByTitle(title: string) {
    try {
      const article = await this.newsRepository.getArticleByTitle(title);
      if (!article) {
        const error = new Error("No article found, please try again.");
        throw error;
      }
      return article;
    } catch (error) {
      console.log("Business Service Error, getArticlesByTitle: ", error);
      return handleError(error);
    }
  }
}
