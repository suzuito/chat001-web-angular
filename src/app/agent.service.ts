import { Injectable } from '@angular/core';
import { Agent } from './model/agent';
import { AgentMessage, Line } from './model/agent_message';
import { DataStore, DataWrapper } from './data.store';
import { AgentMessagesSearchOption } from './agent-messages/agent-messages-search-option.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private agent: Agent;
  private messages: DataStore<AgentMessage>;

  constructor() {
    this.agent = null;
    this.messages = new DataStore<AgentMessage>();
  }

  public set(agent: Agent): void {
    this.agent = agent;
  }

  public get(): Agent {
    return this.agent;
  }

  public setMessage(...msg: AgentMessage[]) {
    msg.forEach((v: AgentMessage) => {
      this.messages.set(v.id, v);
    });
  }

  public filterMessage(opt: AgentMessagesSearchOption): AgentMessage[] {
    return this.messages.findRaw((d: DataWrapper<AgentMessage>): boolean => {
      if (opt.txtWord) {
        const res = d.data.lines.filter((v: Line): boolean => {
          return (new RegExp(opt.txtWord).test(v.body));
        });
        if (res.length <= 0) {
          return false;
        }
      }
      if (opt.chkUnread) {
        if (d.data.read) {
          return false;
        }
      }
      return true;
    });
  }
}
