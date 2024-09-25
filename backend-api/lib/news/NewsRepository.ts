/**
 * Abstracted access to access articles
 * (Removes implementation knowledge required for fetching articles, for the front-end)
 */

import { handleNewsError } from "@/exceptions";
import { NewsError } from "@/exceptions/server";
import { NewsScraperService } from "./ArticleScraper";
import { Ok, Err, Result } from "ts-results";
import { Article } from "@/schemas";
import { categoryTypeEnum } from ".";
import { newsSources } from "./constants";

/**
 * Interface for the news repository.
 *
 * Returns an array of articles on Success.
 * Throws a NewsError Exception on Error
 */
class NewsRepository {
  // Create a unique news feed for each user, by aggrigating articles from multiple sources
  static async getArticles(): Promise<Result<Article[], NewsError>> {
    const topStories = await NewsScraperService.getBySource("SA-N24-TS"); // Get Top Stories
    const worldNews = await NewsScraperService.getBySource("SA-N24-Wrld"); // Get World News
    const opinionNews = await NewsScraperService.getBySource("SA-N24-Op"); // Get Opinion News

    // Handle Errors
    if (topStories.err) return Err(topStories.val);
    if (worldNews.err) return Err(worldNews.val);
    if (opinionNews.err) return Err(opinionNews.val);

    // Mix Articles together
    const articles = topStories.val.concat(worldNews.val, opinionNews.val);

    if (articles.length === 0)
      return Err(handleNewsError(null, 404, "No articles found, please try again."));

    // Limit to only 30 articles
    if (articles.length > 30) articles.length = 30; // Done for Bandwith Optimisation when hosting the app

    // Randomise order
    for (let i = articles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [articles[i], articles[j]] = [articles[j], articles[i]];
    }

    return Ok(articles);
  }

  static async getArticlesByCategory(category: string): Promise<Result<Article[], NewsError>> {
    // Validate Category
    const { success, data, error } = categoryTypeEnum.safeParse(category);
    if (!success) {
      return Err(handleNewsError(error, 404, "No category found, please try again."));
    }

    // Get the Source via the category
    const source = newsSources.filter((src) => src.category).find((src) => src.category === data);
    if (!source) {
      return Err(handleNewsError(null, 404, "No source found, please try again."));
    }

    const articles = await NewsScraperService.getBySource(source.code);
    if (articles.err) return Err(articles.val);

    return Ok(articles.val);
  }

  static async getArticleByTitle(title: string): Promise<Result<Article, NewsError>> {
    const artcile = await NewsScraperService.getByTitle(title); // Get RSS article
    if (artcile.err) return Err(artcile.val);

    if (!artcile.val || artcile.val.pubDate === "Monday Jan 01 0001 00:00:00") {
      return Err(handleNewsError(null, 404, "No article found, please try again."));
    }

    return Ok(artcile.val);
  }
}

export default NewsRepository;
