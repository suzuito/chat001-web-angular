import { Injectable } from '@angular/core';
import { Room } from '../model/room';
import { ErrorService } from '../error.service';
import { DataRoomsService } from '../data-rooms.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class RoomEntranceService {

  public roomId: string;

  constructor(
    private appService: AppService,
    private dataRoomsService: DataRoomsService,
    private errService: ErrorService,
  ) {
    this.roomId = null;
  }

  public async routeToRoom(roomId: string): Promise<void> {
    if (roomId) {
      if (this.dataRoomsService.has(roomId)) {
        this.roomId = roomId;
        return;
      }
    }
    return this.appService.fetchRoom(roomId).then((room: Room) => {
      this.roomId = roomId;
      return;
    }).catch(() => {
      this.errService.errp5XX();
      return;
    });
  }
}
