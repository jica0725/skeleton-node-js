import { Request, Response } from "express";

import { CustomerService } from "../../application/usecases/customer-service-usecase";
import { Purchase } from "../../domain/purchase/entities/purchase";

export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  async getPointsCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const customer = await this.customerService.getPoints(id);
    res.status(200).json(customer);
  }

  async addPointsCustomer(req: Request, res: Response) {
    const purchase: Purchase = req.body;
    const points = this.customerService.amountToPoints(purchase.amount);
    const customer = await this.customerService.addPoints(
      purchase.customerId,
      points
    );
    res.status(200).json(customer);
  }

  async redemptionPointsCustomer(req: Request, res: Response) {
    const purchase: Purchase = req.body;
    const points = this.customerService.amountToPoints(purchase.amount);
    const customer = await this.customerService.redemptionPoints(
      purchase.customerId,
      points
    );
    res.status(200).json(customer);
  }
}
