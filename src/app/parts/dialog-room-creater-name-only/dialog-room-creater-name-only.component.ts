import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RoomInfo, validRoomInfoName, ErrorStateMatcherName } from '../room-info/room-info.component';

@Component({
  selector: 'app-dialog-room-creater-name-only',
  templateUrl: './dialog-room-creater-name-only.component.html',
  styleUrls: ['./dialog-room-creater-name-only.component.scss']
})
export class DialogRoomCreaterNameOnlyComponent implements OnInit {

  public room: RoomInfo;
  public errorStatusName: ErrorStateMatcherName;

  constructor(
    private ref: MatDialogRef<DialogRoomCreaterNameOnlyComponent>,
  ) {
    this.room = {
      name: '',
      description: '',
      password: false,
      passwordRaw: '',
      maxAgents: 100,
      public: true,
    };
    this.errorStatusName = new ErrorStateMatcherName(this.room);
  }

  ngOnInit() {
  }

  public create(): void {
    const err = validRoomInfoName(this.room);
    if (err) {

    }
    this.ref.close(this.room);
  }

  public enter(event: any): void {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
    if (event.isComposing && event.keyCode === 229) {
      return;
    }
    if (event.keyCode === 13) {
      this.create();
    }
  }

}
