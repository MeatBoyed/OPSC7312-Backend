/**
 * Abstracted access to access articles
 * (Removes implementation knowledge required for fetching articles, for the front-end)
 */

import { handleNewsError } from "@/exceptions";
import { NewsError } from "@/exceptions/server";
import { getArticleByTitle, getArticleContent, getSourceNews, getTopStories } from "./newsScraper";
import { validateSource } from "./utils";
import { Article, RSSArticle } from "@/schemas";
import { ServerErrorStatusCode } from "hono/utils/http-status";

interface INewsRepository {
  /**
   * Get all Top Story articles
   */
  getArticles(): Promise<Article[]>;
  /**
   * Get an article by its title
   * @param title The title of the article
   */
  getArticleByTitle(title: string): Promise<Article>;
  /**
   * Get articles from a specific news source
   * @param source The news source of the article
   */
  // getArticlesBySource(source: string): Promise<RSSArticle[]>;
}

/**
 * Interface for the news repository.
 *
 * Returns an array of articles on Success.
 * Throws a NewsError Exception on Error
 * @interface INewsRepository
 */
class NewsRepository implements INewsRepository {
  async getArticles(): Promise<Article[]> {
    try {
      return await getTopStories();
    } catch (error: any) {
      console.log("News SDK Error, getArticles: ", error);
      throw handleNewsError(error);
    }
  }

  async getArticleByTitle(title: string): Promise<Article> {
    try {
      const rssArticle = await getArticleByTitle(title); // Get RSS article
      if (!rssArticle || rssArticle.pubDate === "Monday Jan 01 0001 00:00:00") {
        throw handleNewsError(null, 404, "No article found, please try again.");
      }

      const articleContent = await getArticleContent(rssArticle); // Get Article Content
      return {
        preview: "",
        content: articleContent.content,
        link: rssArticle.link,
        title: rssArticle.title,
        pubDate: rssArticle.pubDate,
        thumbnail: rssArticle?.thumbnail || articleContent?.article?.image || "",
        description: rssArticle?.description || rssArticle.description || "",
      };
    } catch (error: any) {
      console.log("News SDK Error, getArticlesByTitle: ", error);
      throw handleNewsError(error);
    }
  }

  async getArticlesBySource(source: string) {
    // let sourceName;
    // try {
    //   sourceName = validateSource(source);
    // } catch (error: any) {
    //   throw handleNewsError(error);
    // }

    // try {
    //   const articles = await getSourceNews(sourceName);
    //   if (articles.length === 0) {
    //     const error = new NewsError("No articles found, please try again.");
    //     throw handleNewsError(error);
    //   }
    //   return articles;
    // } catch (error: any) {
    //   console.log("News SDK Error, getArticlesBySource: ", error);
    //   throw handleNewsError(error);
    // }
    throw new Error("Not implemented");
  }
}

export default NewsRepository;
