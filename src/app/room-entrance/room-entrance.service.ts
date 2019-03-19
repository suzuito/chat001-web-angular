import { Injectable } from '@angular/core';
import { Room } from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class RoomEntranceService {

  public room: Room;

  constructor() {
    this.room = null;
  }
}
