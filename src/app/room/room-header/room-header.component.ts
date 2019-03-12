import { Component, OnInit, EventEmitter, Output } from '@angular/core';

export enum RoomHeaderClickType {
  Left = 0,
  Center,
  Right,
}

@Component({
  selector: 'app-room-header',
  templateUrl: './room-header.component.html',
  styleUrls: ['./room-header.component.scss']
})
export class RoomHeaderComponent implements OnInit {

  @Output()
  public clickTab: EventEmitter<RoomHeaderClickType>;

  constructor() {
    this.clickTab = new EventEmitter<RoomHeaderClickType>();
  }

  ngOnInit() {
  }

  public clickLeft(): void {
    this.clickTab.emit(RoomHeaderClickType.Left);
  }

  public clickCenter(): void {
    this.clickTab.emit(RoomHeaderClickType.Center);
  }

  public clickRight(): void {
    this.clickTab.emit(RoomHeaderClickType.Right);
  }

}
