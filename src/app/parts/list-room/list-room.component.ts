import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatList } from '@angular/material';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss']
})
export class ListRoomComponent implements OnInit {

  @Input()
  public rooms: Room[];

  @Input()
  public width: string;

  @Input()
  public caption: string;

  @Input()
  public heightList: string;

  @Input()
  public disableHeader: boolean;

  @Input()
  public disableMore: boolean;

  @Output()
  public clickMore: EventEmitter<void>;

  @Output()
  public clickAll: EventEmitter<void>;

  @Output()
  public clickRoom: EventEmitter<Room>;

  constructor() {
    this.rooms = [];
    this.width = '100%';
    this.disableHeader = false;
    this.disableMore = true;
    this.clickAll = new EventEmitter<void>();
    this.clickMore = new EventEmitter<void>();
    this.clickRoom = new EventEmitter<Room>();
  }

  ngOnInit() {
  }
}
