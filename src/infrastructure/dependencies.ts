import { CustomerService } from "../application/usecases/customer-service-usecase";
import { DynamoDBCustomerRepository } from "./customer-repository/dynamo-db-customer-repository";
import { CustomerController } from "./rest-api/customer-controller";

const dynamoDBCustomerRepository = new DynamoDBCustomerRepository();
const customerService = new CustomerService(dynamoDBCustomerRepository);

export const customerController = new CustomerController(customerService);
