import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../model/room';
import { DataService } from '../data.service';
import { RoomEntranceService } from './room-entrance.service';

@Component({
  selector: 'app-room-entrance',
  templateUrl: './room-entrance.component.html',
  styleUrls: ['./room-entrance.component.scss']
})
export class RoomEntranceComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private roomEntService: RoomEntranceService,
  ) { }

  ngOnInit() {
  }

  public get room(): Room {
    return this.dataService.getRoomRaw(this.roomEntService.roomId);
  }

  public enterRoom(): void { }
}
