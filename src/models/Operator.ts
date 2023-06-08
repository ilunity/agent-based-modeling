import { Customer } from './Customer';
import { Agent } from './Agent';
import { Simulator } from './Simulator';
import { Random } from '../utils/random';
import { v4 } from 'uuid';

export interface OperatorInfo {
  name: string;
  customerInService: string | null;
  endOfServiceTime: number;
}

export class Operator extends Agent {
  private customerInService: Customer | null = null;
  private endOfServiceTime = Infinity;
  private _name: string;

  get name(): string {
    return this._name;
  }

  constructor() {
    super();
    this._name = Random.getUniqueName();
  }

  isFree(): boolean {
    return !this.customerInService;
  }

  acceptCustomer(customer: Customer) {
    if (this.isFree()) {
      this.customerInService = customer;
      const servingTime = Random.getIntervalTime(this.lambda);
      this.endOfServiceTime = Simulator.Time + servingTime;

      return servingTime;
    }

    return 0;
  }

  getNextEventTime(): number {
    return this.endOfServiceTime;
  }

  processEvent() {
    super.processEvent();
    this.customerInService = null;
    this.endOfServiceTime = Infinity;
  }

  getInfo():OperatorInfo {
    return {
      name: this._name,
      customerInService: this.customerInService ? this.customerInService.name : null,
      endOfServiceTime: this.endOfServiceTime,
    }
  }
}
