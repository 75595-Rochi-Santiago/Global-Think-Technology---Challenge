import { Request, Response, NextFunction } from "express";
import HttpException from "../errors/exceptions/HttpGenericException";
import { HTTPStatusCode } from "../errors/HttpCode.enum";
import { HTTPMessages } from "../errors/HttpMessages";

export default function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status: number = error.status || 500;
  const message: string = error.message || "Something went wrong";
  console.log("[ERROR] ", status, message, error.stack);
  try {
    res.status(status).json({ status: error.status, message: error.message });
  } catch (error) {
    res.status(HTTPStatusCode.InternalServerError).json({
      status: HTTPStatusCode.InternalServerError,
      message: HTTPMessages.INTERNAL_SERVER_ERROR,
    });
  }
  next();
}
