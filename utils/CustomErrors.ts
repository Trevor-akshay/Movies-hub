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
