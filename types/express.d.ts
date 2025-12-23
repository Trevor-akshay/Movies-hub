import "express";

declare global {
  namespace Express {
    interface Request {
      queryOptions?: {
        search: string | undefined;
        sort: {
          sortBy: string;
          orderBy: string;
        };
        page: number;
        limit: number;
      };
      user?: {
        userId: number;
        email?: string;
      };
    }
  }
}

export {};
