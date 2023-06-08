import { Agent } from './Agent';
import { Random } from '../utils/random';
import { Customer } from './Customer';
import { Bank } from './Bank';
import { Simulator } from './Simulator';
import { TICKS_IN_DAY } from '../utils/consts';

export interface ArrivalInfo {
  nextArrivalTime: number;
}

export class Arrival extends Agent {
  private nextArrivalTime: number;
  private bank: Bank;

  constructor(bank: Bank) {
    super(true);
    this.bank = bank;
    this.nextArrivalTime = Random.getInterArrivalTime(Simulator.Time, TICKS_IN_DAY);
  }

  getNextEventTime(): number {
    return this.nextArrivalTime;
  }

  processEvent() {
    super.processEvent();
    const customer = new Customer();
    this.bank.customerArrived(customer);
    this.nextArrivalTime += Random.getInterArrivalTime(Simulator.Time, TICKS_IN_DAY);
  }

  getInfo(): ArrivalInfo {
    return {
      nextArrivalTime: this.nextArrivalTime,
    };
  }
}
