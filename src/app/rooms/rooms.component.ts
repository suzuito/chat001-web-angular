import { Component, OnInit, ViewChild } from '@angular/core';
import { ListRoomComponent } from '../parts/list-room/list-room.component';
import { RoomsSearchOptionService } from './rooms-search-option/rooms-search-option.service';
import { DataService } from '../data.service';
import { Room } from '../model/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  public isSearchOptionOpened: boolean;

  constructor(
    public searchOptService: RoomsSearchOptionService,
    public dataService: DataService,
  ) {
    this.isSearchOptionOpened = false;
  }

  ngOnInit() {
  }

  public clickExpand(): void {
    if (this.isSearchOptionOpened) {
      this.isSearchOptionOpened = false;
    } else {
      this.isSearchOptionOpened = true;
    }
  }

  public iconExpander(): string {
    if (this.isSearchOptionOpened) {
      return 'expand_less';
    }
    return 'expand_more';
  }

  public rooms(): Room[] {
    return this.dataService.filterRoom(this.searchOptService);
  }

}
