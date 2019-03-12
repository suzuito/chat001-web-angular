import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root'
})
export class RoomResolverService implements Resolve<boolean> {

  constructor(
    private dataService: DataService,
    private roomService: RoomService,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
  ): Promise<boolean> {
    const roomId = route.params.roomId;
    if (!this.dataService.hasRoom(roomId)) {
      // TODO: get from remote
    }
    this.roomService.roomId = route.params.roomId;
    return true;
  }
}
