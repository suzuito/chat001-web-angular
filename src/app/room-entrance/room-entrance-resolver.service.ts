import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { RoomEntranceService } from './room-entrance.service';

@Injectable({
  providedIn: 'root'
})
export class RoomEntranceResolverService implements Resolve<boolean> {

  constructor(
    private dataService: DataService,
    private roomEntService: RoomEntranceService,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
  ): Promise<boolean> {
    const roomId = route.params.roomId;
    if (!this.dataService.hasRoom(roomId)) {
      // TODO: get from remote
    }
    this.roomEntService.roomId = roomId;
    return true;
  }

}
