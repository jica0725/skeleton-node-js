import { Customer } from "./entities/customer";

export interface CustomerGateway {
  addPoints(customerId: string, points: number): Promise<Customer>;
  amountToPoints(amount: number): number;
}
