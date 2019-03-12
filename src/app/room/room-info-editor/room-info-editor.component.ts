import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-info-editor',
  templateUrl: './room-info-editor.component.html',
  styleUrls: ['./room-info-editor.component.scss']
})
export class RoomInfoEditorComponent implements OnInit {

  constructor(
    private roomService: RoomService,
  ) { }

  ngOnInit() {
  }
  public get room(): Room {
    return this.roomService.room;
  }
}
