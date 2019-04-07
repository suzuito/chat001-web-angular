import { Component, OnInit, Input, ViewChildren, ElementRef, QueryList, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { Room, AgentInRoom, AgentRoleInRoom, roleName, roleColor } from 'src/app/model/room';
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
import { AppService } from 'src/app/app.service';
import { DialogRoleSelectorComponent, DataDialogRoleSelector } from 'src/app/parts/dialog-role-selector/dialog-role-selector.component';
import { DialogConfirmerComponent, DataDialogConfirmerComponent } from 'src/app/parts/dialog-confirmer/dialog-confirmer.component';

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
    private appService: AppService,
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
    this.roomService.intr(
      agentsInRoomSelected.map(v => v.agent),
      result,
    );
  }

  public roleName(agentInRoom: AgentInRoom): string {
    return roleName(agentInRoom.role);
  }

  public roleColor(agentInRoom: AgentInRoom): string {
    return roleColor(agentInRoom.role);
  }

  public clickMore(): void {

  }

  public clickChecked(agentInRoom: AgentInRoom): void {
    if (this.isYourSelf(agentInRoom)) {
      return;
    }
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

  public clickMember(agentInRoom: AgentInRoom): void {
    this.appService.openDialogProfile(agentInRoom.agent, true);
  }

  public disabledRoleSelector(): boolean {
    return !this.agentService.isOwner(this.room.id);
  }

  public async clickRoleSelector(agentInRoom: AgentInRoom): Promise<void> {
    const ref1 = this.dialog.open(DialogRoleSelectorComponent, {
      data: {
        role: agentInRoom.role,
      } as DataDialogRoleSelector,
    });
    const result1: AgentRoleInRoom = await ref1.afterClosed().toPromise();
    if (!result1) {
      return;
    }
    if (!this.isYourSelf(agentInRoom)) {
      this.appService.putRoomsMembersRole(this.room.id, agentInRoom.agent.externalId, result1);
      return;
    }
    const ref2 = this.dialog.open(DialogConfirmerComponent, {
      data: {
        msg: 'この部屋の管理権限を捨てようとしています。本当によろしいですか？管理権限を捨てた場合、この部屋の情報を編集することができなくなります。',
        yes: 'はい',
        no: 'いいえ',
      } as DataDialogConfirmerComponent,
    });
    const result2 = await ref2.afterClosed().toPromise();
    if (result2) {
      this.appService.putRoomsMembersRole(this.room.id, agentInRoom.agent.externalId, result1);
      return;
    }
  }

  public isYourSelf(agentInRoom: AgentInRoom): boolean {
    return this.agentService.get().externalId === agentInRoom.agent.externalId;
  }

}
