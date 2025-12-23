import { Request, Response, NextFunction } from "express";

interface QueryOptionsRequest extends Request {}
export const queryParser = (
  req: QueryOptionsRequest,
  _res: Response,
  next: NextFunction
) => {
  let { sort, search, orderBy } = req.query;

  const queryOptions = {
    search: undefined as string | undefined,
    sort: {
      sortBy: "createdAt",
      orderBy: "asc",
    },
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

  req.queryOptions = queryOptions;

  next();
};

export default queryParser;
