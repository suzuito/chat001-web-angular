import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomEntranceService {

  public roomId: string;

  constructor() {
    this.roomId = null;
  }
}
