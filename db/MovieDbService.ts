import { Movie, MovieResponse } from "../types/movie.type.ts";
import { prisma } from "./prisma.ts";

export interface IMovieDbService {
  getMovies(queryOptions: {
    sort: {
      sortBy: string;
      orderBy: string;
    };
    search: string | undefined;
    page: number;
    limit: number;
  }): Promise<MovieResponse[]>;
  getMovieById(id: number): Promise<MovieResponse | null>;
  createMovie(movieData: Movie): Promise<MovieResponse>;
  updateMovie(id: number, movieData: Movie): Promise<MovieResponse>;
  deleteMovie(id: number): Promise<MovieResponse>;
}
class MovieDbService implements IMovieDbService {
  getMovies = async (queryOptions: {
    sort: {
      sortBy: string;
      orderBy: string;
    };
    search: string | undefined;
    page: number;
    limit: number;
  }) => {
    const { search, sort, page, limit } = queryOptions;
    const where: any = {};

    if (search) {
      where.OR = [{ title: { contains: search, mode: "insensitive" } }];
    }

    const orderBy = {
      [sort.sortBy]: sort.orderBy,
    };

    const totalDocuments = await prisma.movie.count({ where });

    let isPageAboveTotalPages = false;

    const totalPages = Math.ceil(totalDocuments / limit);
    if (page > totalPages) {
      isPageAboveTotalPages = true;
    }
    
    return await prisma.movie.findMany({
      where,
      orderBy,
      take: limit,
      skip: isPageAboveTotalPages ? 0 : (page - 1) * limit,
    });
  };

  getMovieById = async (id: number) => {
    return await prisma.movie.findUnique({
      where: { id },
    });
  };

  createMovie = async (movieData: Movie) => {
    return await prisma.movie.create({
      data: movieData,
    });
  };

  updateMovie = async (id: number, movieData: Movie) => {
    return await prisma.movie.update({
      where: { id },
      data: movieData,
    });
  };

  deleteMovie = async (id: number) => {
    return await prisma.movie.delete({
      where: { id },
    });
  };
}

export default MovieDbService;
