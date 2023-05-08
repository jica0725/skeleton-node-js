import { ICustomerRepository } from "../../domain/customer/customer-repository";
import { Customer } from "../../domain/customer/entities/customer";
import { DynamoDB } from "../driven-adapters/AWS/dinamo-db";

export class CustomerRepository implements ICustomerRepository {
  private readonly _db = DynamoDB.getInstance();

  async getById(id: string): Promise<Customer | null> {
    const response = await this._db
      .scan({
        TableName: DynamoDB.TABLE_NAME,
        FilterExpression: "#id = :id",
        ExpressionAttributeNames: {
          "#id": "id",
        },
        ExpressionAttributeValues: {
          ":id": {
            S: id,
          },
        },
      })
      .promise();

    const item = response.Items !== undefined ? response.Items[0] : undefined;

    if (item === undefined) return null;

    const customer = {
      id: item.id.S,
      points: Number(item.points.N),
      name: item.name.S,
    } as Customer;
    return customer;
  }

  async update(customer: Customer): Promise<Customer> {
    await this._db
      .updateItem({
        TableName: DynamoDB.TABLE_NAME,
        Key: {
          id: {
            S: customer.id,
          },
        },
        UpdateExpression: "set #name = :name, #points = :points",
        ExpressionAttributeNames: {
          "#name": "name",
          "#points": "points",
        },
        ExpressionAttributeValues: {
          ":name": {
            S: customer.name,
          },
          ":points": {
            N: `${customer.points}`,
          },
        },
      })
      .promise();

    return customer;
  }
}
