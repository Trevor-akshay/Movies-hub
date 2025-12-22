import { Router } from "express";
import MovieController from "../controller/MovieController.ts";
import DbServive from "../db/DbService.ts";

const moviesRouter = Router();

const dbService = new DbServive();
const movieControllers = new MovieController(dbService);

moviesRouter.get("/", movieControllers.getAllMovies);
moviesRouter.get("/:id", movieControllers.getMovieById);
moviesRouter.post("/", movieControllers.createMovie);
moviesRouter.put("/:id", movieControllers.updateMovie);
moviesRouter.delete("/:id", movieControllers.deleteMovie);

export default moviesRouter;
