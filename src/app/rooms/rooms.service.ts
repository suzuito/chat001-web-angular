import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import { AppService } from '../app.service';
import { RoomsSearchOptionService, orderIdToQuery } from './rooms-search-option/rooms-search-option.service';
import { Rooms } from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private nextCursor: string;

  constructor(
    private appService: AppService,
    private apiService: ApiService,
    private roomsSeartchOpt: RoomsSearchOptionService,
  ) {
    this.nextCursor = '';
  }

  public async apiGetRooms(): Promise<void> {
    return this.appService.apiGetRooms(
      this.nextCursor,
      30,
      orderIdToQuery(this.roomsSeartchOpt.selectedOrderId),
    ).then((rooms: Rooms) => {
      this.nextCursor = rooms.nextCursor;
    });
  }

  public clear(): void {
    this.nextCursor = '';
  }
}
