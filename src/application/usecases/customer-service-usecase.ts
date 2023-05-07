import { CustomerGateway } from "../../domain/customer/customer-gateway";
import { ICustomerRepository } from "../../domain/customer/customer-repository";
import { Customer } from "../../domain/customer/entities/customer";

export class CustomerService implements CustomerGateway {
  constructor(private readonly customerRepository: ICustomerRepository) {}
  amountToPoints(amount: number): number {
    return amount;
  }

  async addPoints(customerId: string, points: number): Promise<Customer> {
    const customer = await this.customerRepository.getById(customerId);
    if (!customer) {
      throw new Error("Method not implemented.");
    }
    customer.points = customer.points || 0 + points;
    return this.customerRepository.update(customer);
  }
}
