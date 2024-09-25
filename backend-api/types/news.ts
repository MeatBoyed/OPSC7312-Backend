interface ArticlesResponse {
  status: string;
  totalResults: number;
  articles: {}[];
}

const NewsCategoriesConst = [
  "TopStories",
  "SouthAfrica",
  "Africa",
  "World",
  "Tech",
  "Sport",
  "Business",
  "Opinion",
] as const;

enum NewsCategories {
  TopStories = "SA-N24-TS",
  SouthAfrica = "SA-N24-SA",
  Africa = "SA-N24-Afri",
  World = "SA-N24-Wrld",
  Tech = "SA-N24-Tech",
  Sport = "SA-N24-Sport",
  Business = "SA-N24-Bus",
  Opinion = "SA-N24-Op",
}
