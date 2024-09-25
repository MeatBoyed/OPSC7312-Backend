/**
 * Abstracted access to access articles
 * (Removes implementation knowledge required for fetching articles, for the front-end)
 */

import { handleNewsError } from "@/exceptions";
import { NewsError } from "@/exceptions/server";
import { NewsScraperService } from "./newsScraper";
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
  // Should aggregate news sources together
  static async getArticles(): Promise<Result<Article[], NewsError>> {
    const artcile = await NewsScraperService.getBySource("SA-N24-TS"); // Get Top Stories
    if (artcile.err) return Err(artcile.val);
    return Ok(artcile.val);
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

    const artcile = await NewsScraperService.getBySource(source.code);
    if (artcile.err) return Err(artcile.val);

    return Ok(artcile.val);
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
