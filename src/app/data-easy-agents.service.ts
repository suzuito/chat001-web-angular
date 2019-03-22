import { Injectable } from '@angular/core';
import { DataStore } from './data.store';
import { EasyAgent } from './model/agent';
import { AgentsSearchOption, OrderId } from './agents/agents-search-option.service';

@Injectable({
  providedIn: 'root'
})
export class DataEasyAgentsService extends DataStore<EasyAgent> {

  constructor() {
    super();
  }

  public setAgent(...agents: EasyAgent[]): void {
    agents.forEach(v => this.set(v.externalId, v));
  }

  public filter(opt: AgentsSearchOption): EasyAgent[] {
    return this.find((agent: EasyAgent) => {
      if (opt.txtWord) {
        if (new RegExp(opt.txtWord).test(agent.name) === false) {
          return false;
        }
      }
      return true;
    }).sort((a: EasyAgent, b: EasyAgent): number => {
      switch (opt.selectedOrderId) {
        case OrderId.Updated:
          return b.updatedAt - a.updatedAt;
      }
      return b.updatedAt - a.updatedAt;
    });
  }

}
