import { ICustomerRepository } from "../../domain/customer/customer-repository";
import { Customer } from "../../domain/customer/entities/customer";
import { client } from "../data-access/dynamo-config";

export class CustomerRepository implements ICustomerRepository {
  async getById(id: string): Promise<Customer | null> {
    const TableName = "customer";
    const { Item } = await client.getItem({
      TableName,
      Key: { id: { S: id } },
    });
    const customer = {
      id: Item?.id.S,
      points: Number(Item?.points),
      name: Item?.name.S,
    } as Customer;
    return customer;
  }

  async update(customer: Customer): Promise<Customer> {
    console.log("Updatade" + customer);
    return customer;
  }
}
