import { Customer } from "./entities/customer";

export interface CustomerGateway {
  addPoints(customerId: string, points: number): Promise<Customer>;
  redemptionPoints(customerId: string, points: number): Promise<Customer>;
  getPoints(customerId: string): Promise<Customer>;
  amountToPoints(amount: number): number;
}
