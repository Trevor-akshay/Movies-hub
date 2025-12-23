import { Request, Response, NextFunction } from "express";

interface QueryOptionsRequest extends Request {}
export const queryParser = (
  req: QueryOptionsRequest,
  _res: Response,
  next: NextFunction
) => {
  let { sort, search, orderBy, page, limit } = req.query;

  const queryOptions = {
    search: undefined as string | undefined,
    sort: {
      sortBy: "id",
      orderBy: "asc",
    },
    page: 1,
    limit: 5,
  };

  if (search && typeof search === "string") {
    queryOptions.search = search.trim().toLowerCase();
  }

  const allowedSorts = ["releaseDate", "rating", "createdAt"];

  if (
    sort &&
    orderBy &&
    typeof sort === "string" &&
    typeof orderBy === "string"
  ) {
    if (
      allowedSorts.includes(sort) &&
      (orderBy === "asc" || orderBy === "desc")
    ) {
      queryOptions.sort.sortBy = sort;
      queryOptions.sort.orderBy = orderBy;
    }
  }

  if (page) queryOptions.page = Math.max(1, Number.parseInt(page as string));
  if (limit)
    queryOptions.limit = Math.min(Number.parseInt(limit as string), 10);

  req.queryOptions = queryOptions;

  next();
};

export default queryParser;
