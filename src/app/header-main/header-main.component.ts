import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomService } from '../room/room.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {

  @Input()
  public title: string;

  @Output()
  public clickMenu: EventEmitter<void>;

  @Output()
  public clickTitle: EventEmitter<void>;

  @Output()
  public clickNotification: EventEmitter<void>;

  @Output()
  public clickRoomInfo: EventEmitter<void>;

  @Output()
  public clickRoomMessage: EventEmitter<void>;

  @Output()
  public clickRoomMember: EventEmitter<void>;

  @Input()
  public displayRoomButtons: boolean;

  constructor() {
    this.clickMenu = new EventEmitter<void>();
    this.clickTitle = new EventEmitter<void>();
    this.clickNotification = new EventEmitter<void>();
    this.clickRoomInfo = new EventEmitter<void>();
    this.clickRoomMember = new EventEmitter<void>();
    this.clickRoomMessage = new EventEmitter<void>();

    this.displayRoomButtons = false;
  }

  ngOnInit() {
  }

  public clickOpenMenu(): void {
    this.clickMenu.emit();
  }

}
