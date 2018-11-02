import { observable, action } from 'mobx';

export class SafeModeService {
  @observable public isSafe: boolean;

  constructor() {
    this.isSafe = false;
  }

  @action
  public turnOnSafeMode(): void {
    this.isSafe = true;
  }

  @action
  public turnOffSafeMode(): void {
    this.isSafe = false;
  }
}