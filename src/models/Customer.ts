import { Agent } from './Agent';
import { Random } from '../utils/random';

export class Customer extends Agent {
  private _name: string;

  get name(): string {
    return this._name;
  }

  constructor() {
    super();
    this._name = Random.getUniqueName();
  }
}
