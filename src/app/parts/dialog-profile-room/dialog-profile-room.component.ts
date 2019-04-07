import { Component, OnInit, Input, Inject } from '@angular/core';
import { Room } from 'src/app/model/room';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export class DataDialogProfileRoom {
  readonly room: Room;
}

@Component({
  selector: 'app-dialog-profile-room',
  templateUrl: './dialog-profile-room.component.html',
  styleUrls: ['./dialog-profile-room.component.scss']
})
export class DialogProfileRoomComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataDialogProfileRoom,
    private ref: MatDialogRef<DialogProfileRoomComponent>,
  ) { }

  ngOnInit() {
  }

  public roomName(): string {
    return this.data.room.name;
  }

  public roomDescription(): string {
    return this.data.room.description;
  }

}
