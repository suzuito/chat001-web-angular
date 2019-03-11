import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit {

  @Input()
  public room: Room;

  @Output()
  public edit: EventEmitter<void>;

  constructor() {
    this.edit = new EventEmitter<void>();
  }

  ngOnInit() {
  }

}
