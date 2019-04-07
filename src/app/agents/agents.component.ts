import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AgentsSearchOptionService, OrderId } from './agents-search-option.service';
import { EasyAgent, RoomAgentInOnlyID } from '../model/agent';
import { SideMenuScrollService, ScrollIdAgents } from '../side-menu/side-menu-scroll.service';
import { DataEasyAgentsService } from '../data-easy-agents.service';
import { Header001Service } from '../header001/header001.service';
import { AgentService } from '../agent.service';
import { MatDialog } from '@angular/material';
import {
  DialogRequesterComponent,
  DataDialogRequester,
} from '../parts/dialog-requester/dialog-requester.component';
import { AppService } from '../app.service';
import { DialogProfileComponent, ResultDialogProfile, DataDialogProfile } from '../parts/dialog-profile/dialog-profile.component';
import { DialogIntroducerComponent } from '../parts/dialog-introducer/dialog-introducer.component';
import { DataAgentsInRoomService } from '../data-agents-in-room.service';
import { DataRoomsService } from '../data-rooms.service';
import { Room } from '../model/room';
import { RoomService } from '../room/room.service';
import { DataEasyAgentsLatestService } from '../data-easy-agents-latest.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private agentService: AgentService,
    private dataEasyAgentsLatestService: DataEasyAgentsLatestService,
    public opt: AgentsSearchOptionService,
    private scrollService: SideMenuScrollService,
    private header001Service: Header001Service,
    private appService: AppService,
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
    return this.dataEasyAgentsLatestService.getAll(this.agentService.get().externalId);
  }

  public async openDialogRequester(agent: EasyAgent): Promise<void> {
    this.appService.openDialogRequester(agent);
  }

  public async openDialogProfile(agent: EasyAgent): Promise<void> {
    this.appService.openDialogProfile(agent, false);
  }

  public async openDialogIntr(agent: EasyAgent): Promise<void> {
    this.appService.openDialogIntr(agent);
  }

}
