import { Component, OnInit, AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { AgentMessagesSearchOptionService } from './agent-messages-search-option.service';
import { AgentMessage } from '../model/agent_message';
import { AgentService } from '../agent.service';
import { SideMenuScrollService, ScrollIdAgentMessages } from '../side-menu/side-menu-scroll.service';
import { Header001Service } from '../header001/header001.service';
import { CursorManagerAgentMessagesService, defaultId } from './cursor-manager-agent-messages.service';

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
    private header001Service: Header001Service,
    private cursorManagerAgentMessages: CursorManagerAgentMessagesService,
  ) { }

  ngOnInit() {
    this.header001Service.title = 'ダイレクトメッセージ';
    this.cursorManagerAgentMessages.initialize(defaultId);
    this.agentService.unreadMessages = 0;
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(ScrollIdAgentMessages, false);
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(ScrollIdAgentMessages);
  }

  public messages(): AgentMessage[] {
    return this.agentService.filterMessage(this.opt);
  }

  public clickMore(): void {
    this.cursorManagerAgentMessages.fetch();
  }

}
