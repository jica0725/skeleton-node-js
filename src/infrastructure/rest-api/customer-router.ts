import express from "express";

import { customerController } from "../dependencies";

const customerRouter = express.Router();

customerRouter.get(
  "/:id/get-points",
  customerController.getPointsCustomer.bind(customerController)
);
customerRouter.put(
  "/add-points",
  customerController.addPointsCustomer.bind(customerController)
);
customerRouter.put(
  "/redemption-points",
  customerController.redemptionPointsCustomer.bind(customerController)
);

export { customerRouter };
