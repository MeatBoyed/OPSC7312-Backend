/**
 * Manages Parsing and Validation of news articles and Sources.
 */

import { Cheerio, load } from "cheerio";
import { isLink, cleanseText, cleanseHtmlTags } from "@/lib/utils";
import { newsSources } from "@/lib/news/constants";
import { BadRequest } from "@/exceptions/server";
import { findChild, findElement } from "./cheerio";

export const isValidSource = (sourceName: string) => !!newsSources.find((src) => src.code === sourceName.toUpperCase());

export const validateSource = (sourceName: string | null) => {
  if (!sourceName) {
    console.log(`Source code was not provided`);
    throw new BadRequest("Source code is required");
  }

  const upperSourceName = sourceName.toUpperCase();
  const isValid = isValidSource(upperSourceName);
  if (!isValid) {
    console.log(`Invalid source code ${sourceName}`);
    throw new BadRequest("Invalid source code");
  }

  return upperSourceName;
};

/**
 * Creates a Base Article from an Item element
 * @param itemElement An item element from the RSS feed
 * @returns BaseArticle
 */
export const articleFromItem = (itemElement: Cheerio<any>) => {
  // Assign elements
  const titleElement = findChild(itemElement, "title");
  const linkElement = findChild(itemElement, "link") || findChild(itemElement, "url") || findChild(itemElement, "guid");
  const pubDateElement = findChild(itemElement, "pubDate") || findChild(itemElement, "dc\\:date");
  const descriptionElement = findChild(itemElement, "description");
  const thumbnailElement = findChild(itemElement, "enclosure");

  if (!titleElement || !linkElement || !pubDateElement) {
    return null;
  }

  // Main article info
  const title = cleanseHtmlTags(titleElement.text().trim());
  const link = linkElement.text().trim();
  if (!isLink(link)) return null;
  const pubDate = pubDateElement.text().trim();
  // Optional article info
  const descElementText = descriptionElement?.text();
  const description = !!descElementText ? cleanseText(descElementText) : "";
  // TODO: Validate that its a link
  const thumbnail = thumbnailElement?.attr()?.url;

  const baseArticle: BaseArticle = {
    title,
    link,
    description,
    pubDate,
    thumbnail,
  };

  return baseArticle;
};

/**
 * Creates a Base Article from a Channel element.
 * TODO: Provide some URL formating to provide Thumbnail, and link.
 * TODO: Try storing data in a database to retrieve more info
 * @param itemElement An item element from the RSS feed
 * @returns BaseArticle
 */
export const articleFromChannel = (itemElement: Cheerio<any>) => {
  // Assign elements
  const titleElement = findChild(itemElement, "title");
  const linkElement = findChild(itemElement, "link") || findChild(itemElement, "url") || findChild(itemElement, "guid");
  const pubDateElement = findChild(itemElement, "pubDate") || findChild(itemElement, "dc\\:date");

  if (!titleElement || !linkElement || !pubDateElement) {
    return null;
  }

  // Main article info
  const title = cleanseHtmlTags(titleElement.text().trim());
  const link = linkElement.text().trim();
  if (!isLink(link)) return null;
  const pubDate = pubDateElement.text().trim();

  const baseArticle: BaseArticle = {
    title,
    link,
    pubDate,
  };

  return baseArticle;
};

// Extracts a single article from a response
export const atricleFromResponse = (responseText: string, url: string): Article | undefined => {
  const $ = load(responseText, { xmlMode: true });

  // Assign list of Items
  const channel = findElement($, "channel");
  if (!channel) {
    console.log(`No items found in ${url}`);
    return;
  }

  // Extract articles from items
  const baseArticle = articleFromItem(channel);
  if (!baseArticle) return undefined;
  return { source: url, ...baseArticle };
};

// Extracts a multiple articles from a response
export const articlesFromResponse = (responseText: string, url: string): Article[] => {
  const $ = load(responseText, { xmlMode: true });

  // Assign list of Items
  const items = findElement($, "item");
  if (!items) {
    console.log(`No items found in ${url}`);
    return [];
  }

  // Extract articles from items
  const articles: Article[] = [];
  for (let i = 0; i < items.length; i++) {
    const element = items.eq(i);
    const itemElement = $(element);

    const baseArticle = articleFromItem(itemElement);
    if (!baseArticle) continue;

    const article: Article = { source: url, ...baseArticle };

    articles.push(article);
    if (articles.length >= 20) break;
  }

  if (articles.length === 0) {
    console.log(`No valid articles found from ${url}`);
  }

  return articles;
};
