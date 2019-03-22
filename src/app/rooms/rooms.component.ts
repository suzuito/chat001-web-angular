import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ListRoomComponent } from '../parts/list-room/list-room.component';
import { RoomsSearchOptionService } from './rooms-search-option/rooms-search-option.service';
import { Room } from '../model/room';
import { SideMenuScrollService, ScrollIdRooms } from '../side-menu/side-menu-scroll.service';
import { RoomsService } from './rooms.service';
import { AppService } from '../app.service';
import { DataRoomsService } from '../data-rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, AfterViewInit, OnDestroy {

  public isSearchOptionOpened: boolean;

  constructor(
    private dataRoomsService: DataRoomsService,
    public searchOptService: RoomsSearchOptionService,
    private scrollService: SideMenuScrollService,
    private roomsService: RoomsService,
    private appService: AppService,
  ) {
    this.isSearchOptionOpened = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(ScrollIdRooms, false);
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(ScrollIdRooms);
  }

  public clickExpand(): void {
    if (this.isSearchOptionOpened) {
      this.isSearchOptionOpened = false;
    } else {
      this.isSearchOptionOpened = true;
    }
  }

  public clickMore(): void {
    this.roomsService.apiGetRooms();
  }

  public iconExpander(): string {
    if (this.isSearchOptionOpened) {
      return 'expand_less';
    }
    return 'expand_more';
  }

  public rooms(): Room[] {
    return this.dataRoomsService.filter(this.searchOptService, false);
  }

  public routeToRoom(room: Room): void {
    this.appService.enterRoom(room);
  }

}
