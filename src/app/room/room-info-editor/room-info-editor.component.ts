import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { RoomService, CurrentRoomRoute } from '../room.service';
import { RoomInfo } from 'src/app/parts/room-info/room-info.component';
import { MatDialog } from '@angular/material';
import { PasswordInputterComponent } from 'src/app/parts/password-inputter/password-inputter.component';
import { SideMenuScrollService, ScrollIdRoomInfo, byRoomId } from 'src/app/side-menu/side-menu-scroll.service';

@Component({
  selector: 'app-room-info-editor',
  templateUrl: './room-info-editor.component.html',
  styleUrls: ['./room-info-editor.component.scss']
})
export class RoomInfoEditorComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private roomService: RoomService,
    private dialog: MatDialog,
    private scrollService: SideMenuScrollService,
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

  public clickDoneRoomInfo(roomInfo: RoomInfo): void {
    console.log(roomInfo);
    if (this.roomService.room.password) {
      const ref = this.dialog.open(PasswordInputterComponent, {
        disableClose: true,
      });
      ref.afterClosed().subscribe((passwordRaw: string) => {
        console.log(passwordRaw);
      });
    }
  }
}
