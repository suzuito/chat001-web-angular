import { Component, OnInit, Input, ViewChildren, ElementRef, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { Room, AgentInRoom, AgentRoleInRoom } from 'src/app/model/room';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomService } from '../room.service';
import { RoomMemberSearchOptionService } from './room-member-search-option/room-member-search-option.service';
import { MatDialog } from '@angular/material';
import { DialogIntroducerComponent } from 'src/app/parts/dialog-introducer/dialog-introducer.component';
import { AgentService } from 'src/app/agent.service';
import { RoomAgentIn, RoomAgentInOnlyID } from 'src/app/model/agent';
import { SideMenuScrollService, ScrollIdRoomMembers, byRoomId } from 'src/app/side-menu/side-menu-scroll.service';
import { DataRoomsService } from 'src/app/data-rooms.service';
import { CursorManagerRoomMemberService } from '../cursor-manager-room-member.service';
import { stringPaddedNumber } from 'src/app/util/date';

@Component({
  selector: 'app-room-member',
  templateUrl: './room-member.component.html',
  styleUrls: ['./room-member.component.scss']
})
export class RoomMemberComponent implements OnInit, OnDestroy, AfterViewInit {

  private checked: Map<string, boolean>;

  constructor(
    private route: ActivatedRoute,
    private agentService: AgentService,
    private roomService: RoomService,
    private dataRoomsService: DataRoomsService,
    private roomMemberFetcher: CursorManagerRoomMemberService,
    public searchOptService: RoomMemberSearchOptionService,
    private dialog: MatDialog,
    private scrollService: SideMenuScrollService,
  ) {
    this.checked = new Map<string, boolean>();
  }

  ngOnInit() {
    this.roomMemberFetcher.initialize(this.roomService.roomId);
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(byRoomId(ScrollIdRoomMembers, this.roomService.roomId), false);
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
    // let ret = true;
    // if (!this.domCheckBox) {
    //   return true;
    // }
    // this.domCheckBox.forEach((p: ProfileInRoomCheckboxComponent) => {
    //   if (p.checked) {
    //     ret = false;
    //   }
    // });
    // return ret;
    return false;
  }

  public intr(): void {
    // const agents = this.domCheckBox.filter((p: ProfileInRoomCheckboxComponent): boolean => p.checked);
    // if (agents.length <= 0) { return; }
    // this.dialog.open(DialogIntroducerComponent, {
    //   data: {
    //     agentNames: agents.map((v: ProfileInRoomCheckboxComponent) => v.agentInRoom.agent.name),
    //     rooms: this.agentService.filterRoom().map((v: RoomAgentInOnlyID) => this.dataRoomsService.get(v.roomId)),
    //   },
    // });
  }

  public role(agentInRoom: AgentInRoom): string {
    if (agentInRoom.role === AgentRoleInRoom.Member) {
      return 'member';
    }
    if (agentInRoom.role === AgentRoleInRoom.Owner) {
      return 'owner';
    }
    return 'member';
  }

  public roleColor(agentInRoom: AgentInRoom): string {
    if (agentInRoom.role === AgentRoleInRoom.Member) {
      return '';
    }
    if (agentInRoom.role === AgentRoleInRoom.Owner) {
      return 'primary';
    }
    return '';
  }

  public changeCheckbox(agentInRoom: AgentInRoom): void {
    if (!this.checked.has(agentInRoom.agent.externalId)) {
      this.checked.set(agentInRoom.agent.externalId, true);
      return;
    }
    this.checked.set(
      agentInRoom.agent.externalId,
      !this.checked.get(agentInRoom.agent.externalId),
    );
  }

  public checkBox(agentInRoom: AgentInRoom): boolean {
    if (!this.checked.has(agentInRoom.agent.externalId)) {
      this.checked.set(agentInRoom.agent.externalId, false);
    }
    return this.checked.get(agentInRoom.agent.externalId);
  }

}
