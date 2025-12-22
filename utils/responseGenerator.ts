import { Response } from "express";
const responseGenerator = (
  status: number,
  isError: boolean,
  data: any,
  res: Response
) => {
  return res.status(status).json({
    success: !isError,
    data: isError
      ? {
          name: data.name,
          message: data.message,
          status: data.status || status,
        }
      : data,
  });
};

export default responseGenerator;
