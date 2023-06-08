import { Random } from '../utils/random';

export abstract class Agent {
  protected lambda: number;
  protected _isActive: boolean;

  get isActive(): boolean {
    return this._isActive;
  }

  constructor(isActive = false, lambda = 3) {
    this.lambda = lambda;
    this._isActive = isActive;
  }

  getNextEventTime() {
    if (!this._isActive) {
      return Infinity;
    }

    return Random.getIntervalTime(this.lambda);
  }

  processEvent() {
  }
}
