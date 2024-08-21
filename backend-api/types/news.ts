interface Source {
  code: string;
  name: string;
  url: string;
}

interface ArticlesResponse {
  status: string;
  totalResults: number;
  articles: {}[];
}
