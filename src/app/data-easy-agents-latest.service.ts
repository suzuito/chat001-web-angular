import { Injectable } from '@angular/core';
import { EasyAgent } from './model/agent';
import { DataStore } from './data.store';

@Injectable({
  providedIn: 'root'
})
export class DataEasyAgentsLatestService extends DataStore<EasyAgent> {

  constructor() {
    super();
  }

  public setAgent(...agents: EasyAgent[]): void {
    agents.forEach(v => this.set(v.externalId, v));
  }

  public getAll(externalId: string): EasyAgent[] {
    return this.find((a: EasyAgent) => a.externalId !== externalId).sort((a: EasyAgent, b: EasyAgent): number => {
      return b.accessedAt - a.accessedAt;
    });
  }

}
