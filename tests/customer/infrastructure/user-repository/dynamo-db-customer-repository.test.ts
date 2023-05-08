import { DynamoDBCustomerRepository } from "../../../../src/infrastructure/customer-repository/dynamo-db-customer-repository";
import { DynamoDB } from "../../../../src/infrastructure/driven-adapters/AWS/dinamo-db";

describe("DynamoDBCustomerRepository", () => {
  let repository: DynamoDBCustomerRepository;

  beforeEach(() => {
    repository = new DynamoDBCustomerRepository();
  });

  // Tests that getById method returns a valid customer.
  it("test_get_by_id_returns_valid_customer", async () => {
    // Arrange
    const customerId = "123";
    const expectedCustomer = {
      id: customerId,
      points: 100,
      name: "John Doe",
    };
    const scanMock = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        Items: [
          {
            id: { S: customerId },
            points: { N: "100" },
            name: { S: "John Doe" },
          },
        ],
      }),
    });
    DynamoDB.getInstance = jest.fn().mockReturnValue({
      scan: scanMock,
    });

    // Act
    const result = await repository.getById(customerId);
    console.log({ result });
    // Assert
    expect(result).toEqual(expectedCustomer);
  });

  // Tests that update method successfully updates a customer's name and points.
  it("test_update_successfully_updates_customer_name_and_points", async () => {
    // Arrange
    const repository = new DynamoDBCustomerRepository();
    const customerToUpdate = {
      id: "validId",
      points: 200,
      name: "Jane Doe",
    };
    const updateMock = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    });
    jest.spyOn(repository["_db"], "updateItem").mockImplementation(updateMock);

    // Act
    const result = await repository.update(customerToUpdate);

    // Assert
    expect(result).toEqual(customerToUpdate);
    expect(updateMock).toHaveBeenCalledWith({
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        id: {
          S: customerToUpdate.id,
        },
      },
      UpdateExpression: "set #name = :name, #points = :points",
      ExpressionAttributeNames: {
        "#name": "name",
        "#points": "points",
      },
      ExpressionAttributeValues: {
        ":name": {
          S: customerToUpdate.name,
        },
        ":points": {
          N: `${customerToUpdate.points}`,
        },
      },
    });
  });

  // Tests that update method throws an error when given an invalid customer.
  it("test_update_throws_error_when_given_invalid_customer", async () => {
    // Arrange
    const repository = new DynamoDBCustomerRepository();
    const invalidCustomer = {
      id: "",
      points: -1,
      name: "",
    };

    // Act & Assert
    await expect(repository.update(invalidCustomer)).rejects.toThrow();
  });

  // Tests that getById method returns null when given an invalid id.
  it("test_get_by_id_returns_null_when_given_invalid_id", async () => {
    // Arrange
    const repository = new DynamoDBCustomerRepository();
    const invalidId = "";

    // Act
    const result = await repository.getById(invalidId);

    // Assert
    expect(result).toBeNull();
  });
});
