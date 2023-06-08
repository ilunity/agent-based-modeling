import { Customer } from './Customer';
import { Agent } from './Agent';

export interface QueueInfo {
  customers: string[],
}

export class Queue extends Agent {
  private customers: Customer[] = [];

  acceptCustomer(customer: Customer) {
    this.customers.push(customer);
  }

  callCustomer() {
    return this.customers.pop();
  }

  getInfo(): QueueInfo {
    return {
      customers: this.customers.map(customer => customer.name),
    };
  }
}
