import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ProfileEditorComponent, DataProfileEditorComponent } from '../parts/profile-editor/profile-editor.component';
import { AgentService } from '../agent.service';
import { Agent, RoomAgentIn, RoomAgentInOnlyID } from '../model/agent';
import { Router } from '@angular/router';
import { AppRootService } from '../app-root/app-root.service';
import { Room } from '../model/room';
import { AppService } from '../app.service';
import { DataRoomsService } from '../data-rooms.service';
import { Header001Service } from '../header001/header001.service';
import { RoomMessageService } from '../room-message.service';
import { SideMenuWidthService } from './side-menu-width.service';
import { WsService } from '../ws.service';
import { ErrorService } from '../error.service';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private roomMessageService: RoomMessageService,
    private agentService: AgentService,
    private appRootService: AppRootService,
    private appService: AppService,
    private dataRoomsService: DataRoomsService,
    private dialog: MatDialog,
    private header001Service: Header001Service,
    private wsService: WsService,
    private errorService: ErrorService,
    private settingService: SettingService,
  ) { }

  ngOnInit() {
  }

  public async openEditProfile(): Promise<void> {
    const agent = this.agentService.get();
    const ref = this.dialog.open(ProfileEditorComponent, {
      data: {
        name: agent.name,
        description: agent.description,
        isPublic: agent.isPublic,
        settingSoundOn: !this.settingService.mute,
      } as DataProfileEditorComponent,
      autoFocus: false,
    });
    const result: DataProfileEditorComponent = await ref.afterClosed().toPromise();
    if (!result) {
      return;
    }
    this.settingService.mute = !result.settingSoundOn;
    return this.appService.updateAgentProperties(
      result.name,
      result.description,
      result.isPublic,
    );
  }

  public routeToProfileAvatarEditor(): void {
    this.router.navigate(['agents', 'avatar']);
    this.appRootService.closeSideNav();
  }

  public agent(): Agent {
    return this.agentService.get();
  }

  public routeToRoomCreator(): void {
    this.router.navigate(['room-creator']);
    this.appRootService.closeSideNav();
  }

  public routeToNewRooms(): void {
    this.header001Service.routeToNewRooms();
    this.appRootService.closeSideNav();
  }

  public routeToFormalRooms(): void {
    this.header001Service.routeToFormalRooms();
    this.appRootService.closeSideNav();
  }

  public routeToAgents(): void {
    this.header001Service.routeToAgents();
    this.appRootService.closeSideNav();
  }

  public routeToAgentMessages(): void {
    this.header001Service.routeToAgentMessages();
    this.appRootService.closeSideNav();
  }

  public roomsAgentIn(): Room[] {
    return this.agentService.filterRoom().map((v: RoomAgentInOnlyID) => this.dataRoomsService.get(v.roomId));
  }

  public routeToRoom(room: Room): void {
    this.router.navigate(['room', room.id]);
    this.appRootService.closeSideNav();
  }

  public unreadAgentMessages(): number {
    return this.agentService.unreadMessages;
  }

  public unreadAgentMessagesBadgeHidden(): boolean {
    return this.agentService.unreadMessages <= 0;
  }

  public unreadRoomMessages(room: Room): string {
    if (!room) {
      return '0';
    }
    return this.roomMessageService.unread(room.id);
  }

  public includeYourMention(room: Room): boolean {
    return this.roomMessageService.includeYourMention(room.id);
  }

  public wsColor(): string {
    return this.wsService.wsColor();
  }

  public clickWsColor(): void {
    this.errorService.warn(`Web socketの接続ステータス: ${this.wsService.readyStateString()}`);
  }
}
