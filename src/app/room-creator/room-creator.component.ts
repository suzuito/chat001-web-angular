import { Component, OnInit } from '@angular/core';
import { Room } from '../model/room';
import { RoomInfo } from '../parts/room-info/room-info.component';

@Component({
  selector: 'app-room-creator',
  templateUrl: './room-creator.component.html',
  styleUrls: ['./room-creator.component.scss']
})
export class RoomCreatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public clickDoneRoomInfo(room: RoomInfo): void {
    console.log(room);
  }

}
