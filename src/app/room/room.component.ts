import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RoomService, CurrentRoomRoute } from './room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(
    public roomService: RoomService,
    public router: Router,
  ) { }

  ngOnInit(
  ) {
  }

  public routeToAnyRoomRoute(): void {
    switch (this.roomService.currentRoomRoute) {
      case CurrentRoomRoute.Message:
        this.router.navigate(['room', this.roomService.roomId, 'member']);
        return;
      case CurrentRoomRoute.Info:
        this.router.navigate(['room', this.roomService.roomId]);
        return;
    }
    this.router.navigate(['room', this.roomService.roomId]);
  }

  public iconRoomRoute(): string {
    switch (this.roomService.currentRoomRoute) {
      case CurrentRoomRoute.Message:
        return 'group';
      case CurrentRoomRoute.Info:
        return 'message';
    }
    return 'message';
  }

}
