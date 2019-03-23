import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { AppService } from '../app.service';
import { RoomsSearchOptionService, orderIdToQuery } from './rooms-search-option/rooms-search-option.service';
import { Rooms } from '../model/room';
import { Header001Service } from '../header001/header001.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(
    private appService: AppService,
    private apiService: ApiService,
    private roomsSeartchOpt: RoomsSearchOptionService,
  ) {
  }
}
