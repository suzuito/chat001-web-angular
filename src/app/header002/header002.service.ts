import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService, CurrentRoomRoute } from '../room/room.service';
import { AgentService } from '../agent.service';

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

}
