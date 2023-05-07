import express from "express";

import { customerController } from "../dependencies";

const customerRouter = express.Router();

customerRouter.put(
  "/add-points",
  customerController.addPointsCustomer.bind(customerController)
);

export { customerRouter };
