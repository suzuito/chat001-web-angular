import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/model/room';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-message',
  templateUrl: './room-message.component.html',
  styleUrls: ['./room-message.component.scss']
})
export class RoomMessageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private roomService: RoomService,
  ) { }

  ngOnInit() {
  }

  public get room(): Room {
    return this.roomService.room;
  }
}
