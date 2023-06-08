import { Agent } from './Agent';
import { Bank, BankInfo } from './Bank';
import { Arrival, ArrivalInfo } from './Arrival';

export interface SimulatorInfo {
  bank: BankInfo;
  arrival: ArrivalInfo;
}

export class Simulator {
  private agents: Agent[] = [];
  private bank: Bank;
  private arrival: Arrival;
  static Time = 0;

  constructor(operatorsCount: number) {
    this.bank = new Bank(operatorsCount);
    this.arrival = new Arrival(this.bank);

    this.agents = [this.bank, this.arrival];
  }

  run() {
    Simulator.Time = 0;
    let activeAgent: Agent | null;

    do {
      let tmin = Infinity;
      activeAgent = null;

      for (const agent of this.agents) {
        const ta = agent.getNextEventTime();
        if (ta < tmin) {
          tmin = ta;
          activeAgent = agent;
        }
      }

      Simulator.Time = tmin;
      if (activeAgent !== null) {
        activeAgent.processEvent();
      }
    } while (!this.isStopCondition(Simulator.Time, activeAgent));
  }

  step(time: number) {
    Simulator.Time = time;

    this.sortAgents();
    for (const agent of this.agents) {
      if (agent.getNextEventTime() > time) {
        return;
      }

      agent.processEvent();
    }
  }

  sortAgents() {
    this.agents = this.agents.sort((a, b) => a.getNextEventTime() - b.getNextEventTime());
  }

  isStopCondition(t: number, activeAgent: Agent | null): boolean {
    return t > 2000 || activeAgent === null;
  }

  getInfo(): SimulatorInfo {
    return {
      bank: this.bank.getInfo(),
      arrival: this.arrival.getInfo(),
    };
  }
}
