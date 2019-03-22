import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ListRoomComponent } from '../parts/list-room/list-room.component';
import { RoomsSearchOptionService, OrderId } from './rooms-search-option/rooms-search-option.service';
import { Room } from '../model/room';
import { SideMenuScrollService, ScrollIdRooms } from '../side-menu/side-menu-scroll.service';
import { RoomsService } from './rooms.service';
import { AppService } from '../app.service';
import { DataRoomsService } from '../data-rooms.service';
import { Header001Service } from '../header001/header001.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ParamAsNumber } from '../util';
import { CursorManagerRoomsService } from './cursor-manager-rooms.service';

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
    private cursorManagerRoomsService: CursorManagerRoomsService,
    private appService: AppService,
    private header001Service: Header001Service,
    private route: ActivatedRoute,
  ) {
    this.isSearchOptionOpened = false;
    this.route.queryParams.subscribe((params: Params) => {
      switch (ParamAsNumber(params, 'd', -1)) {
        case OrderId.Newed:
          this.searchOptService.selectedOrderId = OrderId.Newed;
          this.header001Service.title = '新着順';
          break;
        case OrderId.Boost:
          this.searchOptService.selectedOrderId = OrderId.Boost;
          this.header001Service.title = '人気順';
          break;
        default:
          this.searchOptService.selectedOrderId = OrderId.Newed;
          this.header001Service.title = '新着順';
          break;
      }
    });
  }

  ngOnInit() {
    this.header001Service.title = '新着順';
    this.cursorManagerRoomsService.initialize(this.searchOptService.selectedOrderId.toString());
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
    this.cursorManagerRoomsService.fetch(this.searchOptService.selectedOrderId.toString());
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
