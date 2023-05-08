import { CustomerGateway } from "../../domain/customer/customer-gateway";
import { ICustomerRepository } from "../../domain/customer/customer-repository";
import { Customer } from "../../domain/customer/entities/customer";

export class CustomerService implements CustomerGateway {
  constructor(private readonly customerRepository: ICustomerRepository) {}
  async getPoints(customerId: string): Promise<Customer> {
    const customer = await this.customerRepository.getById(customerId);
    if (!customer) throw new Error("Data not found!");
    return customer;
  }

  async redemptionPoints(
    customerId: string,
    points: number
  ): Promise<Customer> {
    const customer = await this.customerRepository.getById(customerId);
    if (!customer) throw new Error("Data not found!");
    if (customer.points < points) throw new Error("Insufficient points!");
    customer.points -= points;
    return this.customerRepository.update(customer);
  }

  amountToPoints(amount: number): number {
    return amount;
  }

  async addPoints(customerId: string, points: number): Promise<Customer> {
    const customer = await this.customerRepository.getById(customerId);
    if (!customer) throw new Error("Data not found!");
    customer.points = customer.points || 0 + points;
    return this.customerRepository.update(customer);
  }
}
