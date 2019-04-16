import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Room } from '../model/room';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InitRoomResolverService implements Resolve<Room> {

  constructor(
    private apiService: ApiService,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
  ): Promise<Room> {
    const roomId = route.params.roomId;
    return this.apiService.getLandingRooms(roomId);
  }

}
