import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ListRoomComponent } from '../parts/list-room/list-room.component';
import { RoomsSearchOptionService, OrderId, RoomType } from './rooms-search-option/rooms-search-option.service';
import { Room } from '../model/room';
import { SideMenuScrollService, ScrollIdRooms } from '../side-menu/side-menu-scroll.service';
import { RoomsService } from './rooms.service';
import { AppService } from '../app.service';
import { DataRoomsService } from '../data-rooms.service';
import { Header001Service } from '../header001/header001.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ParamAsNumber } from '../util';
import { CursorManagerRoomsService } from './cursor-manager-rooms.service';
import { AgentService } from '../agent.service';

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
    private agentService: AgentService,
    private cursorManagerRoomsService: CursorManagerRoomsService,
    private appService: AppService,
    private header001Service: Header001Service,
    private route: ActivatedRoute,
  ) {
    this.isSearchOptionOpened = false;
    this.header001Service.title = '';
    this.route.queryParams.subscribe((params: Params) => {
      this.searchOptService.roomType = ParamAsNumber(params, 't', RoomType.Any);
      this.searchOptService.selectedOrderId = ParamAsNumber(params, 'd', OrderId.Newed);
      this.resetTitle();
    });
    this.resetTitle();
  }

  ngOnInit() {
    this.cursorManagerRoomsService.initialize(this.searchOptService.selectedOrderId.toString());
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(ScrollIdRooms, false);
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(ScrollIdRooms);
  }

  private resetTitle(): void {
    this.header001Service.title = '';
    switch (this.searchOptService.roomType) {
      case RoomType.FixedOnly:
        this.header001Service.title += '公式ルーム';
        break;
      default:
        this.header001Service.title += 'ルーム一覧';
        break;
    }
    switch (this.searchOptService.selectedOrderId) {
      case OrderId.Newed:
        this.header001Service.title += '（新着順）';
        break;
      case OrderId.Boost:
        this.header001Service.title += '（人気順）';
        break;
      default:
        this.header001Service.title += '（新着順）';
        break;
    }
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

  public isRoomAgentIn(room: Room): boolean {
    return this.agentService.isInRoom(room.id);
  }

  public isOwner(room: Room): boolean {
    return this.agentService.isOwner(room.id);
  }

}
