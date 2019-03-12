import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { RoomService } from '../room.service';
import { RoomInfo } from 'src/app/parts/room-info/room-info.component';
import { MatDialog } from '@angular/material';
import { PasswordInputterComponent } from 'src/app/parts/password-inputter/password-inputter.component';

@Component({
  selector: 'app-room-info-editor',
  templateUrl: './room-info-editor.component.html',
  styleUrls: ['./room-info-editor.component.scss']
})
export class RoomInfoEditorComponent implements OnInit {

  constructor(
    private roomService: RoomService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
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
