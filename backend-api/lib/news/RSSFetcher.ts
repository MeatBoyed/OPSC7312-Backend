import { RSSArticle } from "@/schemas";
import { articlesFromResponse, atricleFromResponse } from "./utils";
import { NewsError } from "@/exceptions/server";
import { Err, Ok, Result } from "ts-results";
import { handleNewsError } from "@/exceptions";
import { StatusCode } from "hono/utils/http-status";

/**
 * Direct implemenation of Fetching XML &
 * off-loading Parsing & validation of news articles from RSS.
 * @param source RSS source
 * @returns Article[]
 */
export const fetchArticlesFromRSS = async (
  url: string
): Promise<Result<RSSArticle[], NewsError>> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
    },
  });

  if (!response.ok!) {
    console.log(`Failed to fetch RSS feed ${url}`);
    return Err(
      handleNewsError(response, response.status as StatusCode, `Failed to fetch RSS feed ${url}`)
    );
  }

  const responseText = await response.text();
  return Ok(await articlesFromResponse(responseText, url));
};

export const fetchSingleArticleFromRSS = async (
  url: string
): Promise<Result<RSSArticle | undefined, NewsError>> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
    },
  });

  if (!response.ok) {
    return Err(
      handleNewsError(response, response.status as StatusCode, `Failed to fetch RSS feed ${url}`)
    );
  }

  // 2 - Find Items
  const responseText = await response.text();
  return Ok(await atricleFromResponse(responseText, url));
};
