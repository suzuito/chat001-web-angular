import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomResolverService implements Resolve<boolean> {

  constructor() { }

  public async resolve(
    route: ActivatedRouteSnapshot,
  ): Promise<boolean> {
    const roomId = route.params.roomId;
    return true;
  }
}
