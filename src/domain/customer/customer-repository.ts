import { Customer } from "./entities/customer";

export interface ICustomerRepository {
  getById(id: string): Promise<Customer | null>;
  update(customer: Customer): Promise<Customer>;
}
