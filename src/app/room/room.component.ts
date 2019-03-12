import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { Room } from '../model/room';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoomHeaderClickType } from './room-header/room-header.component';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private roomService: RoomService,
  ) { }

  ngOnInit(
  ) {
  }

  public clickTab(t: RoomHeaderClickType): void {
    switch (t) {
      case RoomHeaderClickType.Center:
        this.router.navigate(['room', this.roomService.roomId]);
        return;
      case RoomHeaderClickType.Right:
        this.router.navigate(['room', this.roomService.roomId, 'member']);
        return;
      case RoomHeaderClickType.Left:
        this.router.navigate(['room', this.roomService.roomId, 'info']);
        return;
    }
  }

}
