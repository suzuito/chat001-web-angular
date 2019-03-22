import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RoomService } from './room.service';
import { CursorManagerRoomMessageService } from './cursor-manager-room-message.service';

@Injectable({
  providedIn: 'root'
})
export class RoomResolverService implements Resolve<boolean> {

  constructor(
    private roomService: RoomService,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
  ): Promise<any> {
    await this.roomService.routeToRoom(route.params.roomId);
  }
}
