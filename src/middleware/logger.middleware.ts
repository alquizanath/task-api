import { Request, Response, NextFunction } from "express";
import { logger } from "../utils";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestStart = Date.now();

  res.on("finish", () => {
    const { headers, method, url, body } = req;

    logger.info(
      JSON.stringify({
        // timestamp: new Date().toISOString(),
        processingTime: Date.now() - requestStart,
        method,
        url,
        headers: JSON.stringify(headers),
        body: JSON.stringify(body),
      })
    );
  });

  next();
};

export default loggerMiddleware;
