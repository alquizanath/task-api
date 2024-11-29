import { plainToClass } from "class-transformer";
import { HttpStatusCode } from "../types";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { validate } from "class-validator";
import { logger } from "../utils/logger";

export const validateQuery = (dtoClass: any): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const dto = plainToClass(dtoClass, req.query as any) as object;

    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) =>
        Object.values(error.constraints || {}).join(", ")
      );

      logger.error(`${errorMessages}`);

      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: HttpStatusCode.BAD_REQUEST,
        errors: errorMessages,
      });
    }

    next();
  };
};
