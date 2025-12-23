export class ValidationError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "ValidationError";
    this.status = status;
  }
}

export const validateMovieData = (data: any) => {
  let { title, description, genre, releaseDate, rating, imgUrl } = data;

  if (!title || typeof title !== "string") {
    throw new ValidationError("Title is required and must be a string", 400);
  }
  if (
    !genre ||
    !Array.isArray(genre) ||
    !genre.every((g) => typeof g === "string")
  ) {
    throw new ValidationError(
      "Genre is required and must be an array of strings",
      400
    );
  }

  if (description && typeof description !== "string") {
    throw new ValidationError("Description must be a string", 400);
  }

  if (releaseDate) {
    releaseDate = Number.parseInt(releaseDate);
    if (isNaN(releaseDate))
      throw new ValidationError("Release Date must be a number", 400);
  }
  if (rating) {
    rating = Number.parseFloat(rating);
    if (isNaN(rating) || rating < 0 || rating > 10)
      throw new ValidationError(
        "Rating must be a number between 0 and 10",
        400
      );
  }

  if (imgUrl && typeof imgUrl !== "string") {
    throw new ValidationError("Image URL must be a string", 400);
  }

  return { title, description, genre, releaseDate, rating, imgUrl };
};

export const validateUserData = (data: any) => {
  let { email, password, name } = data;

  if (!email || typeof email !== "string") {
    throw new ValidationError("Email is required and must be a string", 400);
  }

  if (!password || typeof password !== "string") {
    throw new ValidationError("Password is required and must be a string", 400);
  }

  if (name && typeof name !== "string") {
    throw new ValidationError("Name must be a string", 400);
  }

  return { email, password, name };
};


export enum HTTPStatusCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  PartialContent = 206,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTiemout = 504,
}