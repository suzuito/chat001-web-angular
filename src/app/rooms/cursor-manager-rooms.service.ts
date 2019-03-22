import { Injectable } from '@angular/core';
import { CursorManager } from '../cursor-manager';
import { LocalStorageService, LocalStorageKey } from '../local-storage.service';
import { ApiService } from '../api.service';
import { Rooms } from '../model/room';
import { DataRoomsService } from '../data-rooms.service';

@Injectable({
  providedIn: 'root'
})
export class CursorManagerRoomsService extends CursorManager {

  constructor(
    private dataRoomsService: DataRoomsService,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
  ) {
    super();
  }

  public async fetch(id: string): Promise<void> {
    return this.apiService.getRooms(
      this.localStorageService.get(LocalStorageKey.A),
      this.get(id),
      30,
    ).then((rooms: Rooms) => {
      this.dataRoomsService.setRoom(...rooms.rooms);
      this.set(id, rooms.nextCursor);
      return;
    });
  }
}
