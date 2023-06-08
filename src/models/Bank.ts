import { Queue, QueueInfo } from './Queue';
import { Customer } from './Customer';
import { Service, ServiceInfo } from './Service';
import { Agent } from './Agent';

export interface BankInfo {
  service: ServiceInfo;
  queue: QueueInfo;
  arrivalsCount: number;
  avgServingTime: number;
}

export class Bank extends Agent {
  private queue: Queue = new Queue();
  private service: Service;
  private arrivalsCount = 0;
  private servedCustomers = 0;
  private commonServingTime = 0;

  constructor(operatorsCount: number) {
    super(true);
    this.service = new Service(operatorsCount);
  }

  customerArrived(customer: Customer) {
    this.arrivalsCount++;

    if (this.service.findFreeOperator()) {
      this.commonServingTime += this.service.acceptCustomer(customer);
      return;
    }

    this.queue.acceptCustomer(customer);
  }

  getNextEventTime(): number {
    return this.service.getNextEventTime();
  }

  processEvent() {
    this.servedCustomers++;
    this.service.processEvent();
    const customerFromQueue = this.queue.callCustomer();

    if (customerFromQueue) {
      this.commonServingTime += this.service.acceptCustomer(customerFromQueue);
    }
  }

  getInfo(): BankInfo {
    let avgTime = this.commonServingTime / this.servedCustomers;
    avgTime = avgTime < Infinity ? avgTime : 0;

    return {
      queue: this.queue.getInfo(),
      service: this.service.getInfo(),
      arrivalsCount: this.arrivalsCount,
      avgServingTime: avgTime,
    };
  }
}
