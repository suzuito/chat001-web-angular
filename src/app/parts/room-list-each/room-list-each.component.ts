import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-room-list-each',
  templateUrl: './room-list-each.component.html',
  styleUrls: ['./room-list-each.component.scss']
})
export class RoomListEachComponent implements OnInit {

  @Input()
  public room: Room;

  @Output()
  public clickRoom: EventEmitter<Room>;

  constructor() {
    this.clickRoom = new EventEmitter<Room>();
  }

  ngOnInit() {
  }

  public iconPublic(): string {
    if (this.room.public) {
      return 'public';
    }
    return 'vpn_lock';
  }

  public iconPassword(): string {
    if (this.room.password) {
      return 'lock';
    }
    return 'lock_open';
  }

}
