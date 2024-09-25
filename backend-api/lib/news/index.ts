import { z } from "zod";
import NewsRepository from "./NewsRepository";

const categoryTypeEnum = z.enum([
  "topstories",
  "southafrica",
  "africa",
  "world",
  "business",
  "sport",
  "opinion",
  "tech",
]);
type CategoryType = z.infer<typeof categoryTypeEnum>;

interface Source {
  code: string;
  name: string;
  url: string;
  category?: CategoryType;
}

export default NewsRepository;
export { categoryTypeEnum, type CategoryType, type Source };
