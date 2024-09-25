/**
 * Direct implementation of Fetching & off-loading Parsing & validation of news articles from RSS.
 */
import { newsSources } from "./constants";
import { NewsError } from "@/exceptions/server";
import { Article } from "@/schemas";
import { Err, Ok, Result } from "ts-results";
import { handleNewsError } from "@/exceptions";
import { fetchArticlesFromRSS, fetchSingleArticleFromRSS } from "./RSSFetcher";
import { Source } from ".";

// export const getRandomNews = async (): Promise<RSSArticle[]> => {
//   const sourceIndex = Math.floor(Math.random() * newsSources.length);
//   const source = newsSources[sourceIndex];

//   const articles = await fetchArticlesFromRSS(source.url);
//   if (articles.err) return [];
//   return articles.val;
// };

export class NewsScraperService {
  // Handler for querying via a specified source
  static async getBySource(sourceCode: string): Promise<Result<Article[], NewsError>> {
    // Get the news source & handle errors
    const source = this.getNewsSource(sourceCode);
    if (source.err)
      return Err(handleNewsError(source.val.cause, source.val.code, source.val.message));

    const rssArticles = await fetchArticlesFromRSS(source.val.url); // Get the Articles
    if (rssArticles.err) return Err(rssArticles.val);

    return Ok(
      rssArticles.val.map((article) => ({
        title: article.title,
        link: article.link,
        pubDate: article.pubDate,
        thumbnail: article.thumbnail || "",
        description: article.description || "",
        content: "",
        preview: "",
        category: "Top Stories",
      }))
    );
  }

  static async getByTitle(title: string): Promise<Result<Article, NewsError>> {
    const source = this.getNewsSource("SA-N24-TS");
    if (source.err) return Err(source.val);

    const url = source.val.url.replace("/rss", "") + `/${title}/rss`; // Special Url formatting for Title query

    const rssArticle = await fetchSingleArticleFromRSS(`${url}`);
    if (rssArticle.err) return Err(rssArticle.val);
    if (!rssArticle.val)
      return Err(handleNewsError(null, 404, `No article found, please try again.`));

    return Ok({
      title: rssArticle.val.title,
      link: rssArticle.val.link,
      pubDate: rssArticle.val.pubDate,
      thumbnail: rssArticle.val.thumbnail || "",
      description: rssArticle.val.description || "",
      content: "",
      preview: "",
      category: source.val.name,
    });
  }

  // Helper for querying via a specified source
  static getNewsSource(sourceCode: string): Result<Source, NewsError> {
    const source = newsSources.find((src) => src.code === sourceCode);
    if (!source) {
      return Err(handleNewsError(null, 404, "No source found, please try again."));
    }
    return Ok(source);
  }
}
