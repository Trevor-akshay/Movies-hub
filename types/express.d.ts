import "express";

declare global {
  namespace Express {
    interface Request {
      queryOptions?: {
        search?: string;
        sort: {
          sortBy: string;
          orderBy: string;
        };
      };
    }
  }
}

export {};
