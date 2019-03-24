import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AgentsSearchOptionService, OrderId } from './agents-search-option.service';
import { EasyAgent } from '../model/agent';
import { SideMenuScrollService, ScrollIdAgents } from '../side-menu/side-menu-scroll.service';
import { DataEasyAgentsService } from '../data-easy-agents.service';
import { Header001Service } from '../header001/header001.service';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private agentService: AgentService,
    private dataEasyAgents: DataEasyAgentsService,
    public opt: AgentsSearchOptionService,
    private scrollService: SideMenuScrollService,
    private header001Service: Header001Service,
  ) {
    this.opt.selectedOrderId = OrderId.Accessed;
  }

  ngOnInit() {
    this.header001Service.title = 'アクティブユーザー';
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(ScrollIdAgents, false);
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(ScrollIdAgents);
  }

  public agents(): EasyAgent[] {
    return this.dataEasyAgents.filter(this.opt).
      filter(v => {
        return v.externalId !== this.agentService.get().externalId;
      });
  }

}
