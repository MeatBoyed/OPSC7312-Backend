/**
 * Direct implementation of Fetching & off-loading Parsing & validation of news articles from RSS.
 */

import { load } from "cheerio";
import { newsSources } from "./constants";
import { articlesFromResponse, atricleFromResponse } from "@/lib/news/utils";
import { BadRequest } from "@/exceptions/server";
import { extract } from "@extractus/article-extractor";
import { Article, RSSArticle } from "@/schemas";

/**
 * Direct implemenation of Fetching XML &
 * off-loading Parsing & validation of news articles from RSS.
 * @param source RSS source
 * @returns Article[]
 */
export const fetchNewsFromRSS = async (url: string): Promise<RSSArticle[]> => {
  // 1 - Fetch the RSS feed
  let response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
      },
    });
  } catch (error: any) {
    console.log(`Failed to fetch RSS feed ${url}, ${error.message}`);
    return [];
  }

  if (response.status !== 200) {
    console.log(`Bad response from RSS feed ${url}`);
    return [];
  }

  // 2 - Find Items
  const responseText = await response.text();
  const articles = await articlesFromResponse(responseText, url);

  return articles; // 4 - Return articles
};

export const fetchSingleArticleFromRSS = async (url: string): Promise<RSSArticle | undefined> => {
  // 1 - Fetch the RSS feed
  let response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
      },
    });
  } catch (error: any) {
    console.log(`Failed to fetch RSS feed ${url}, ${error.message}`);
    return;
  }

  if (response.status !== 200) {
    console.log(`Bad response from RSS feed ${url}`);
    return;
  }

  // 2 - Find Items
  const responseText = await response.text();
  const articles = await atricleFromResponse(responseText, url);

  // console.log("Articles: ", articles);
  return articles; // 4 - Return articles
};

export const getSourceNews = async (sourceCode: string): Promise<RSSArticle[]> => {
  const source = newsSources.find((src) => src.code === sourceCode.toUpperCase());

  if (!source) {
    console.log(`${sourceCode} source doesn't exist`);
    throw new BadRequest(`Invalid source name`);
  }

  try {
    const articles = await fetchNewsFromRSS(source.url);
    return articles;
  } catch (error: any) {
    console.log(`getNewsSource failed: for ${source.name}, reason: ${error.message}`);
    return [];
  }
};

export const getRandomNews = async (): Promise<RSSArticle[]> => {
  const sourceIndex = Math.floor(Math.random() * newsSources.length);
  const source = newsSources[sourceIndex];

  try {
    const articles = await fetchNewsFromRSS(source.url);
    return articles;
  } catch (error: any) {
    console.log(`getRandomNews failed: for ${source.name}, reason: ${error.message}`);
    return [];
  }
};

export const getTopStories = async (): Promise<Article[]> => {
  const rssArticles = await getSourceNews("SA-N24-TS");
  return rssArticles.map((article) => ({
    title: article.title,
    link: article.link,
    pubDate: article.pubDate,
    thumbnail: article.thumbnail || "",
    description: article.description || "",
    content: "",
    preview: "",
  }));
};

export const getArticleByTitle = async (title: string): Promise<RSSArticle | undefined> => {
  // TODO: Assume that source is from news24 (remove this state/assuption)
  const source = newsSources.find((src) => src.code === "SA-N24-TS");

  if (!source) {
    console.log(`${title} article doesn't exist`);
    throw new BadRequest(`Invalid article name`);
  }

  const url = source.url.replace("/rss", "") + `/${title}/rss`;

  try {
    return await fetchSingleArticleFromRSS(`${url}`);
  } catch (error: any) {
    console.log(`getNewsSource failed: for ${source.name}, reason: ${error.message}`);
    return;
  }
};

export const getArticleContent = async (rssArticle: RSSArticle) => {
  const article = await extract(rssArticle.link);
  const $ = load(article?.content || "");
  const content = $("div").text().trim().replace(/\s+/g, " ");
  return { content: content, article: article };
};
