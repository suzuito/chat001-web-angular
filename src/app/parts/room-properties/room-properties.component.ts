import { Component, OnInit, Input } from '@angular/core';
import { Room, RoomStatus } from 'src/app/model/room';

@Component({
  selector: 'app-room-properties',
  templateUrl: './room-properties.component.html',
  styleUrls: ['./room-properties.component.scss']
})
export class RoomPropertiesComponent implements OnInit {

  @Input()
  public room: Room;

  @Input()
  public isRoomAgentIn: boolean;

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

  public iconRoomAgentIn(): string {
    if (this.isRoomAgentIn) {
      return 'person_pin';
    }
    return '';
  }

  public iconStatus(): string {
    if (this.room.status > RoomStatus.Deletable) {
      return 'delete';
    }
    if (this.room.status === RoomStatus.Active) {
      return '';
    }
    return '';
  }

}
