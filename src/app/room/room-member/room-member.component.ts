import { Component, OnInit, Input, ViewChildren, ElementRef, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { Room, AgentInRoom } from 'src/app/model/room';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomService } from '../room.service';
import { RoomMemberSearchOptionService } from './room-member-search-option/room-member-search-option.service';
import { ProfileInRoomCheckboxComponent } from 'src/app/parts/profile-in-room-checkbox/profile-in-room-checkbox.component';
import { MatDialog } from '@angular/material';
import { DialogIntroducerComponent } from 'src/app/parts/dialog-introducer/dialog-introducer.component';
import { AgentService } from 'src/app/agent.service';
import { RoomAgentIn } from 'src/app/model/agent';
import { SideMenuScrollService, ScrollIdRoomMembers, byRoomId } from 'src/app/side-menu/side-menu-scroll.service';

@Component({
  selector: 'app-room-member',
  templateUrl: './room-member.component.html',
  styleUrls: ['./room-member.component.scss']
})
export class RoomMemberComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren('checkBox')
  public domCheckBox: QueryList<ProfileInRoomCheckboxComponent>;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private agentService: AgentService,
    private roomService: RoomService,
    public searchOptService: RoomMemberSearchOptionService,
    private dialog: MatDialog,
    private scrollService: SideMenuScrollService,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(byRoomId(ScrollIdRoomMembers, this.roomService.roomId));
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(byRoomId(ScrollIdRoomMembers, this.roomService.roomId));
  }

  public get room(): Room {
    return this.roomService.room;
  }

  public getAgentsInRoom(): AgentInRoom[] {
    return this.roomService.getAgents();
  }

  public clearChecked(): void {
  }

  public disableButtonIntr(): boolean {
    let ret = true;
    if (!this.domCheckBox) {
      return true;
    }
    this.domCheckBox.forEach((p: ProfileInRoomCheckboxComponent) => {
      if (p.checked) {
        ret = false;
      }
    });
    return ret;
  }

  public intr(): void {
    const agents = this.domCheckBox.filter((p: ProfileInRoomCheckboxComponent): boolean => p.checked);
    if (agents.length <= 0) { return; }
    this.dialog.open(DialogIntroducerComponent, {
      data: {
        agentNames: agents.map((v: ProfileInRoomCheckboxComponent) => v.agentInRoom.agent.name),
        rooms: this.agentService.filterRoom().map((v: RoomAgentIn) => v.room),
      },
    });
  }

}
