import { Component, OnInit, Input, ViewChildren, ElementRef, QueryList, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { Room, AgentInRoom, AgentRoleInRoom } from 'src/app/model/room';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomService, CurrentRoomRoute } from '../room.service';
import { RoomMemberSearchOptionService } from './room-member-search-option/room-member-search-option.service';
import { MatDialog } from '@angular/material';
import { DialogIntroducerComponent, DataIntroducer } from 'src/app/parts/dialog-introducer/dialog-introducer.component';
import { AgentService } from 'src/app/agent.service';
import { RoomAgentIn, RoomAgentInOnlyID } from 'src/app/model/agent';
import { SideMenuScrollService, ScrollIdRoomMembers, byRoomId } from 'src/app/side-menu/side-menu-scroll.service';
import { DataRoomsService } from 'src/app/data-rooms.service';
import { CursorManagerRoomMemberService } from '../cursor-manager-room-member.service';

@Component({
  selector: 'app-room-member',
  templateUrl: './room-member.component.html',
  styleUrls: ['./room-member.component.scss']
})
export class RoomMemberComponent implements OnInit, OnDestroy, AfterViewInit {

  private checkedMap: Map<string, boolean>;

  constructor(
    private roomService: RoomService,
    private roomMemberFetcher: CursorManagerRoomMemberService,
    public searchOptService: RoomMemberSearchOptionService,
    private scrollService: SideMenuScrollService,
    private dialog: MatDialog,
    private agentService: AgentService,
    private dataRoomsService: DataRoomsService,
  ) {
    this.checkedMap = new Map<string, boolean>();
  }

  ngOnInit() {
    this.roomService.currentRoomRoute = CurrentRoomRoute.Member;
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
    const agentsInRoom = this.roomService.getAgents();
    if (agentsInRoom.length <= 0) { return; }
    let result = true;
    agentsInRoom.forEach((agentInRoom: AgentInRoom) => {
      if (this.checkedMap.get(agentInRoom.agent.externalId)) {
        result = false;
      }
    });
    return result;
  }

  public async intr(): Promise<void> {
    const agentsInRoom = this.roomService.getAgents();
    if (agentsInRoom.length <= 0) { return; }
    const agentsInRoomSelected: AgentInRoom[] = [];
    agentsInRoom.forEach((agentInRoom: AgentInRoom) => {
      if (this.checkedMap.get(agentInRoom.agent.externalId)) {
        agentsInRoomSelected.push(agentInRoom);
      }
    });
    const ref = this.dialog.open(DialogIntroducerComponent, {
      data: {
        agentNames: agentsInRoomSelected.map(v => v.agent.name),
        rooms: this.agentService.filterRoom().map((v: RoomAgentInOnlyID) => this.dataRoomsService.get(v.roomId)),
      } as DataIntroducer,
    });
    const result: Room = await ref.afterClosed().toPromise();
    if (!result) {
      return;
    }
    this.roomService.intr(agentsInRoomSelected, result);
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

  public clickMore(): void {

  }

  public clickChecked(agentInRoom: AgentInRoom): void {
    if (this.checkedMap.get(agentInRoom.agent.externalId) === true) {
      this.checkedMap.set(agentInRoom.agent.externalId, false);
    } else {
      this.checkedMap.set(agentInRoom.agent.externalId, true);
    }
  }

  public checked(agentInRoom: AgentInRoom): boolean {
    if (!this.checkedMap.has(agentInRoom.agent.externalId)) {
      this.checkedMap.set(agentInRoom.agent.externalId, false);
    }
    return this.checkedMap.get(agentInRoom.agent.externalId);
  }

}
