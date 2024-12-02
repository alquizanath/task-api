import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { initializeDatabase } from "./database";
import { logger } from "@utils";

import swaggerUi, { SwaggerOptions } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
const swaggerOptions = require("../swagger");

(async () => {
  try {
    await initializeDatabase();

    const PORT = process.env.PORT || 3001;

    const swaggerSpec: SwaggerOptions = swaggerJSDoc(swaggerOptions);

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.listen(PORT, () => {
      logger.info(`Task api is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    logger.error(`${e}`);
    throw e;
  }
})();
