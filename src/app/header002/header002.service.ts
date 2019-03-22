import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../room/room.service';

@Injectable({
  providedIn: 'root'
})
export class Header002Service {

  public title: string;

  constructor(
    private roomService: RoomService,
    private router: Router,
  ) {
    this.title = 'test';
  }

  public routeToRoomInfo() {
    this.router.navigate(['room', this.roomService.roomId, 'info']);
  }
}
