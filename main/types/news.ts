interface Source {
  code: string;
  name: string;
  url: string;
}

interface BaseArticle {
  title: string;
  link: string;
  description?: string;
  pubDate: string;
  thumbnail?: string; // Article's thumbnail image url
}

interface Article extends BaseArticle {
  source: string;
}

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
  getArticlesBySource(source: string): Promise<Article[]>;
}

interface ArticlesResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
