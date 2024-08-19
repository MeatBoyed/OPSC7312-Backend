/**
 * Abstracted access to access articles
 * (Removes implementation knowledge required for fetching articles, for the front-end)
 */

import { handleError, handleNewsError } from "@/exceptions";
import { NewsError, ServerException } from "@/exceptions/server";
import { getArticleByTitle, getSourceNews, getTopStories } from "./newsScraper";
import { validateSource } from "./utils";

/**
 * Interface for the news repository.
 *
 * Returns an array of articles on Success.
 * Throws a NewsError Exception on Error
 * @interface INewsRepository
 */
class NewsRepository implements INewsRepository {
  async getArticles() {
    try {
      return await getTopStories();
    } catch (error: any) {
      console.log("News SDK Error, getArticles: ", error);
      throw handleNewsError(error);
    }
  }

  async getArticleByTitle(title: string): Promise<Article> {
    try {
      const article = await getArticleByTitle(title);
      if (!article) {
        const error = new NewsError("No article found, please try again.");
        throw handleNewsError(error);
      }
      return article;
    } catch (error: any) {
      console.log("News SDK Error, getArticlesByTitle: ", error);
      throw handleNewsError(error);
    }
  }

  async getArticlesBySource(source: string) {
    let sourceName;
    try {
      sourceName = validateSource(source);
    } catch (error: any) {
      throw handleNewsError(error);
    }

    try {
      const articles = await getSourceNews(sourceName);
      if (articles.length === 0) {
        const error = new NewsError("No articles found, please try again.");
        throw handleNewsError(error);
      }
      return articles;
    } catch (error: any) {
      console.log("News SDK Error, getArticlesBySource: ", error);
      throw handleNewsError(error);
    }
  }
}

export default NewsRepository;
