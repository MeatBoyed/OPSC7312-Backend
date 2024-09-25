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

export enum NewsCategories {
  TopStories = "SA-N24-TS",
  SouthAfrica = "SA-N24-SA",
  Africa = "SA-N24-Afri",
  World = "SA-N24-Wrld",
  Tech = "SA-N24-Tech",
  Sport = "SA-N24-Sport",
  Business = "SA-N24-Bus",
  Opinion = "SA-N24-Op",
}

interface ArticlesResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
