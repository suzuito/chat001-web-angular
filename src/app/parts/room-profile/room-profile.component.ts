import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { getRealStyle } from 'src/app/util';

@Component({
  selector: 'app-room-profile',
  templateUrl: './room-profile.component.html',
  styleUrls: ['./room-profile.component.scss']
})
export class RoomProfileComponent implements OnInit {

  @Input()
  public isRoomAgentIn: boolean;

  @Input()
  public width: string;

  @Input()
  public room: Room;

  @Input()
  public linesDescription: number;

  @Input()
  public unread: number;

  @Input()
  public nameOnly: boolean;

  constructor() {
    this.linesDescription = 1;
    this.unread = 0;
    this.nameOnly = false;
  }

  ngOnInit() {
  }

  public unreadString(): string {
    return this.unread.toString();
  }

  public hiddenBadge(): boolean {
    return this.unread <= 0;
  }

  public roomName(): string {
    if (!this.room) {
      return '';
    }
    return this.room.name;
  }

  public icon(): string {
    if (this.room.fixed) {
      return 'location_city';
    }
    return 'home';
  }

}
