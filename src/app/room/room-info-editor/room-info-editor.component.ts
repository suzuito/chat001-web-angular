import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { RoomService, CurrentRoomRoute } from '../room.service';
import { RoomInfo } from 'src/app/parts/room-info/room-info.component';
import { MatDialog } from '@angular/material';
import { PasswordInputterComponent } from 'src/app/parts/password-inputter/password-inputter.component';
import { SideMenuScrollService, ScrollIdRoomInfo, byRoomId } from 'src/app/side-menu/side-menu-scroll.service';
import { AgentService } from 'src/app/agent.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-room-info-editor',
  templateUrl: './room-info-editor.component.html',
  styleUrls: ['./room-info-editor.component.scss']
})
export class RoomInfoEditorComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private roomService: RoomService,
    private agentService: AgentService,
    private dialog: MatDialog,
    private scrollService: SideMenuScrollService,
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.roomService.currentRoomRoute = CurrentRoomRoute.Info;
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(byRoomId(ScrollIdRoomInfo, this.roomService.roomId), false);
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(byRoomId(ScrollIdRoomInfo, this.roomService.roomId));
  }

  public get room(): Room {
    return this.roomService.room;
  }

  public async clickDoneRoomInfo(roomInfo: RoomInfo): Promise<void> {
    this.appService.putRooms(this.room.id, roomInfo);
  }

  public changable(): boolean {
    if (!this.room) {
      return false;
    }
    return this.agentService.isOwner(this.room.id);
  }

  public async deleteRoom(): Promise<void> {
    const result = await this.appService.openDialogConfirmer(
      '部屋を削除します。削除したら戻せません。本当に削除しますか?',
      'はい', 'いいえ',
    );
    if (!result) {
      return;
    }
    this.appService.deleteRooms(this.room.id);
  }

  public isOwner(): boolean {
    if (!this.room) {
      return false;
    }
    return this.agentService.isOwner(this.room.id);
  }

  public agentName(): string {
    return this.agentService.get().name;
  }
}
