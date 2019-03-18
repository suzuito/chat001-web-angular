import { Component, OnInit, AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { AgentMessagesSearchOptionService } from './agent-messages-search-option.service';
import { AgentMessage } from '../model/agent_message';
import { AgentService } from '../agent.service';
import { SideMenuScrollService, ScrollIdAgentMessages } from '../side-menu/side-menu-scroll.service';

@Component({
  selector: 'app-agent-messages',
  templateUrl: './agent-messages.component.html',
  styleUrls: ['./agent-messages.component.scss']
})
export class AgentMessagesComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public agentService: AgentService,
    public opt: AgentMessagesSearchOptionService,
    private scrollService: SideMenuScrollService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(ScrollIdAgentMessages);
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(ScrollIdAgentMessages);
  }

  public messages(): AgentMessage[] {
    return this.agentService.filterMessage(this.opt);
  }

}
