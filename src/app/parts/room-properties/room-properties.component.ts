import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-room-properties',
  templateUrl: './room-properties.component.html',
  styleUrls: ['./room-properties.component.scss']
})
export class RoomPropertiesComponent implements OnInit {

  @Input()
  public room: Room;

  constructor() { }

  ngOnInit() {
  }

  public iconPassword(): string {
    if (this.room.password) {
      return 'lock';
    }
    return 'lock_open';
  }

  public iconPublic(): string {
    if (this.room.public) {
      return 'public';
    }
    return 'vpn_lock';
  }

}
