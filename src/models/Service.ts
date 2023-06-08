import { Customer } from './Customer';
import { Agent } from './Agent';
import { Operator, OperatorInfo } from './Operator';

export interface ServiceInfo {
  freeOperators: OperatorInfo[];
  busyOperators: OperatorInfo[];
}

export class Service extends Agent {
  private operators: Operator[] = [];

  constructor(operatorsCount: number) {
    super();

    for (let i = 0; i < operatorsCount; i++) {
      this.operators.push(new Operator());
    }
  }

  acceptCustomer(customer: Customer) {
    const freeOperator = this.findFreeOperator();

    if (freeOperator) {
      return freeOperator.acceptCustomer(customer);
    }

    return 0;
  }

  findFreeOperator() {
    const freeOperator = this.operators.find(operator => operator.isFree());
    return freeOperator;
  }

  getNextEventTime(): number {
    return this.getNearestEventOperator()?.getNextEventTime() || Infinity;
  }

  getNearestEventOperator() {
    let nearestEventOperatorTime = Infinity;
    let nearestEventOperator: Operator | null = null;

    for (const operator of this.operators) {
      const eventTime = operator.getNextEventTime();

      if (eventTime <= nearestEventOperatorTime) {
        nearestEventOperatorTime = eventTime;
        nearestEventOperator = operator;
      }
    }

    return nearestEventOperator;
  }

  processEvent() {
    super.processEvent();
    this.getNearestEventOperator()?.processEvent();
  }

  getInfo(): ServiceInfo {
    const serviceInfo: ServiceInfo = {
      freeOperators: [],
      busyOperators: [],
    };

    for (const operator of this.operators) {
      if (operator.isFree()) {
        serviceInfo.freeOperators.push(operator.getInfo());
        continue;
      }

      serviceInfo.busyOperators.push(operator.getInfo());
    }

    return serviceInfo;
  }
}
