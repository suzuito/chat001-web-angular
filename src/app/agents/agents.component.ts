import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AgentsSearchOptionService } from './agents-search-option.service';
import { EasyAgent } from '../model/agent';
import { SideMenuScrollService, ScrollIdAgents } from '../side-menu/side-menu-scroll.service';
import { DataEasyAgentsService } from '../data-easy-agents.service';
import { Header001Service } from '../header001/header001.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private dataEasyAgents: DataEasyAgentsService,
    public opt: AgentsSearchOptionService,
    private scrollService: SideMenuScrollService,
    private header001Service: Header001Service,
  ) { }

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
    return this.dataEasyAgents.filter(this.opt);
  }

}
