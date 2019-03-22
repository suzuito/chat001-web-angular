import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AgentsSearchOptionService } from './agents-search-option.service';
import { EasyAgent } from '../model/agent';
import { SideMenuScrollService, ScrollIdAgents } from '../side-menu/side-menu-scroll.service';
import { DataEasyAgentsService } from '../data-easy-agents.service';

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
  ) { }

  ngOnInit() {
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
