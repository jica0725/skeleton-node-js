import "../src/load-env-vars";

import bodyParser from "body-parser";
import express from "express";

import { config } from "./config";
import { customerRouter } from "./infrastructure/rest-api/customer-router";
function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/customers", customerRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
