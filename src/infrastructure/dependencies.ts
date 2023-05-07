import { CustomerService } from "../application/usecases/customer-service-usecase";
import { CustomerRepository } from "./customer-repository/customer-repository";
import { CustomerController } from "./rest-api/customer-controller";

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);

export const customerController = new CustomerController(customerService);
