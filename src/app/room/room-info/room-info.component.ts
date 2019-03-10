import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit {

  @Input()
  public room: Room;

  constructor() { }

  ngOnInit() {
  }

}
