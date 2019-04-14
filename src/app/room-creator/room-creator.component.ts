import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Room } from '../model/room';
import { RoomInfo } from '../parts/room-info/room-info.component';
import { SideMenuScrollService, ScrollIdRoomCreator } from '../side-menu/side-menu-scroll.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Header001Service } from '../header001/header001.service';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-room-creator',
  templateUrl: './room-creator.component.html',
  styleUrls: ['./room-creator.component.scss']
})
export class RoomCreatorComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private scrollService: SideMenuScrollService,
    private appService: AppService,
    private agentService: AgentService,
    private router: Router,
    private header001Service: Header001Service,
  ) { }

  ngOnInit() {
    this.header001Service.title = '部屋の作成';
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(ScrollIdRoomCreator, false);
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(ScrollIdRoomCreator);
  }

  public clickDoneRoomInfo(room: RoomInfo): void {
    this.appService.createRoom(
      room.name,
      room.name,
      room.description,
      room.maxAgents,
      room.public,
      room.passwordRaw,
      true,
    );
  }

  public agentName(): string {
    return this.agentService.get().name;
  }
}
