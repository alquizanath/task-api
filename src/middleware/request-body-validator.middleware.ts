import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { HttpStatusCode } from "@types";
import { logger } from "@utils";

export const validateBody = (dto: any): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const dtoInstance = plainToInstance(dto, req.body);
    const errors = await validate(dtoInstance);

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
