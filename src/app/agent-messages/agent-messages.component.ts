import { Component, OnInit } from '@angular/core';
import { AgentMessagesSearchOptionService } from './agent-messages-search-option.service';
import { AgentMessage } from '../model/agent_message';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agent-messages',
  templateUrl: './agent-messages.component.html',
  styleUrls: ['./agent-messages.component.scss']
})
export class AgentMessagesComponent implements OnInit {

  constructor(
    public agentService: AgentService,
    public opt: AgentMessagesSearchOptionService,
  ) { }

  ngOnInit() {
  }

  public messages(): AgentMessage[] {
    return this.agentService.filterMessage(this.opt);
  }

}
