import { Router } from "express";
import MovieController from "../controller/MovieController.ts";
import MovieDbService from "../db/MovieDbService.ts";
import authenticate from "../middleware/authentication.ts";
import queryParser from "../middleware/queryParser.ts";
import RateLimiter from "../middleware/RateLimiter.ts";

const moviesRouter = Router();

const movieDbService = new MovieDbService();
const movieControllers = new MovieController(movieDbService);

moviesRouter.get(
  "/",
  authenticate,
  RateLimiter,
  queryParser,
  movieControllers.getAllMovies
);
moviesRouter.get(
  "/:id",
  authenticate,
  RateLimiter,
  movieControllers.getMovieById
);
moviesRouter.post("/", authenticate, RateLimiter, movieControllers.createMovie);
moviesRouter.put(
  "/:id",
  authenticate,
  RateLimiter,
  movieControllers.updateMovie
);
moviesRouter.delete(
  "/:id",
  authenticate,
  RateLimiter,
  movieControllers.deleteMovie
);

export default moviesRouter;
