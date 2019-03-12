import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/model/room';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-member',
  templateUrl: './room-member.component.html',
  styleUrls: ['./room-member.component.scss']
})
export class RoomMemberComponent implements OnInit {

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
