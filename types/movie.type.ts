import responseGenerator from "../utils/responseGenerator.ts";

type Movie = {
  title: string;
  description?: string;
  genre: string[];
  releaseDate?: number;
  rating?: number;
  imgUrl?: string;
};

type MovieResponse = {
  id: number;
  title: string;
  description: string | null;
  genre: string[];
  releaseDate: number | null;
  rating: number | null;
  imgUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type responseGeneratorType = typeof responseGenerator;

export { Movie, MovieResponse, responseGeneratorType };
