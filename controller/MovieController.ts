import { NextFunction, Request, Response } from "express";

import { ValidationError, validateMovieData } from "../utils/CustomErrors.ts";
import responseGenerator from "../utils/responseGenerator.ts";
import { Movie } from "../types/movie.type.ts";
import { IMovieDbService } from "../db/MovieDbService.ts";

interface IMovieController {
  getAllMovies(req: Request, res: Response, next: NextFunction): Promise<void>;
  getMovieById(req: Request, res: Response, next: NextFunction): Promise<void>;
  createMovie(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateMovie(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteMovie(req: Request, res: Response, next: NextFunction): Promise<void>;
}
class MovieController implements IMovieController {
  movieDbService: IMovieDbService;
  constructor(movieDbService: IMovieDbService) {
    this.movieDbService = movieDbService;
  }

  getAllMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const queryOptions = req.queryOptions!;

      const movies = await this.movieDbService.getMovies(queryOptions);

      responseGenerator(200, false, movies, res);
      return;
    } catch (error) {
      next(error);
    }
  };

  getMovieById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = Number.parseInt(req.params.id);

      if (isNaN(id)) throw new ValidationError("Invalid movie ID", 400);

      const movie = await this.movieDbService.getMovieById(id);

      if (!movie) throw new ValidationError("Movie not found", 404);

      responseGenerator(200, false, movie, res);
      return;
    } catch (error) {
      next(error);
    }
  };

  createMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const movieData = req.body;

      const validatedMovieData: Movie = validateMovieData(movieData);

      const newMovie = await this.movieDbService.createMovie(
        validatedMovieData
      );

      responseGenerator(201, false, newMovie, res);
      return;
    } catch (error) {
      next(error);
    }
  };

  updateMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = Number.parseInt(req.params.id);

      if (isNaN(id)) throw new ValidationError("Invalid movie ID", 400);

      const movieData = req.body;

      const validatedMovieData: Movie = validateMovieData(movieData);

      const newMovie = await this.movieDbService.updateMovie(
        id,
        validatedMovieData
      );

      responseGenerator(200, false, newMovie, res);
      return;
    } catch (error) {
      next(error);
    }
  };

  deleteMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = Number.parseInt(req.params.id);

      if (isNaN(id)) throw new ValidationError("Invalid movie ID", 400);

      await this.movieDbService.deleteMovie(id);

      res.status(204).send();
      return;
    } catch (error) {
      next(error);
    }
  };
}


export default MovieController;
