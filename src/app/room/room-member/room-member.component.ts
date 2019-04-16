import { Component, OnInit, Input, ViewChildren, ElementRef, QueryList, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { Room, AgentInRoom, AgentRoleInRoom, roleName, roleColor, newAgentInRoom, AgentInRoomOnlyID } from 'src/app/model/room';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomService, CurrentRoomRoute } from '../room.service';
import { RoomMemberSearchOptionService } from './room-member-search-option/room-member-search-option.service';
import { MatDialog } from '@angular/material';
import { DialogIntroducerComponent, DataIntroducer } from 'src/app/parts/dialog-introducer/dialog-introducer.component';
import { AgentService } from 'src/app/agent.service';
import { RoomAgentIn, RoomAgentInOnlyID, EasyAgent } from 'src/app/model/agent';
import { SideMenuScrollService, ScrollIdRoomMembers, byRoomId } from 'src/app/side-menu/side-menu-scroll.service';
import { DataRoomsService } from 'src/app/data-rooms.service';
import { CursorManagerRoomMemberService } from '../cursor-manager-room-member.service';
import { AppService } from 'src/app/app.service';
import { DialogRoleSelectorComponent, DataDialogRoleSelector } from 'src/app/parts/dialog-role-selector/dialog-role-selector.component';
import { DialogConfirmerComponent, DataDialogConfirmerComponent } from 'src/app/parts/dialog-confirmer/dialog-confirmer.component';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { DataAgentsInRoomService } from 'src/app/data-agents-in-room.service';

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
    private dataEasyAgentsService: DataEasyAgentsService,
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

  public getAgentsInRoomOnlyID(): AgentInRoomOnlyID[] {
    return this.roomService.getAgentsOnlyID()
      .filter(a => this.dataEasyAgentsService.has(a.externalID))
      ;
  }

  public getAgent(a: AgentInRoomOnlyID): EasyAgent {
    if (!this.dataEasyAgentsService.has(a.externalID)) {
      return null;
    }
    return this.dataEasyAgentsService.get(a.externalID);
  }

  public disableButtonIntr(): boolean {
    const agentsInRoomOnlyID = this.getAgentsInRoomOnlyID();
    if (agentsInRoomOnlyID.length <= 0) { return; }
    let result = true;
    agentsInRoomOnlyID.forEach((agentInRoomOnlyID: AgentInRoomOnlyID) => {
      if (this.checkedMap.get(agentInRoomOnlyID.externalID)) {
        result = false;
      }
    });
    return result;
  }

  public async intr(): Promise<void> {
    const agentsInRoomOnlyID = this.getAgentsInRoomOnlyID();
    if (agentsInRoomOnlyID.length <= 0) { return; }
    const agentsInRoomSelected: AgentInRoomOnlyID[] = [];
    agentsInRoomOnlyID.forEach((agentInRoomOnlyID: AgentInRoomOnlyID) => {
      if (this.checkedMap.get(agentInRoomOnlyID.externalID)) {
        agentsInRoomSelected.push(agentInRoomOnlyID);
      }
    });
    this.appService.openDialogIntr(
      agentsInRoomSelected
        .filter(a => this.dataEasyAgentsService.has(a.externalID))
        .map(a => this.dataEasyAgentsService.get(a.externalID)),
      this.agentService.filterRoom()
        .filter(r => r.roomId !== this.room.id)
        .map(v => this.dataRoomsService.get(v.roomId)),
    );
  }

  public roleName(agentInRoomOnlyID: AgentInRoomOnlyID): string {
    return roleName(agentInRoomOnlyID.role);
  }

  public clickChecked(agentInRoomOnlyID: AgentInRoomOnlyID): void {
    if (this.isYourSelf(agentInRoomOnlyID)) {
      return;
    }
    if (this.checkedMap.get(agentInRoomOnlyID.externalID) === true) {
      this.checkedMap.set(agentInRoomOnlyID.externalID, false);
    } else {
      this.checkedMap.set(agentInRoomOnlyID.externalID, true);
    }
  }

  public checked(agentInRoomOnlyID: AgentInRoomOnlyID): boolean {
    if (!this.checkedMap.has(agentInRoomOnlyID.externalID)) {
      this.checkedMap.set(agentInRoomOnlyID.externalID, false);
    }
    return this.checkedMap.get(agentInRoomOnlyID.externalID);
  }

  public clickMember(a: AgentInRoomOnlyID): void {
    if (!this.dataEasyAgentsService.has(a.externalID)) {
      return;
    }
    this.appService.openDialogProfile(
      this.dataEasyAgentsService.get(a.externalID), true,
    );
  }

  public disabledRoleSelector(): boolean {
    return !this.agentService.isOwner(this.room.id);
  }

  public async clickRoleSelector(agentInRoomOnlyID: AgentInRoomOnlyID): Promise<void> {
    const ref1 = this.dialog.open(DialogRoleSelectorComponent, {
      data: {
        role: agentInRoomOnlyID.role,
      } as DataDialogRoleSelector,
    });
    const result1: AgentRoleInRoom = await ref1.afterClosed().toPromise();
    if (!result1) {
      return;
    }
    if (!this.isYourSelf(agentInRoomOnlyID)) {
      this.appService.putRoomsMembersRole(this.room.id, agentInRoomOnlyID.externalID, result1);
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
      this.appService.putRoomsMembersRole(this.room.id, agentInRoomOnlyID.externalID, result1);
      return;
    }
  }

  public isYourSelf(agentInRoomOnlyID: AgentInRoomOnlyID): boolean {
    return this.agentService.get().externalId === agentInRoomOnlyID.externalID;
  }

}
