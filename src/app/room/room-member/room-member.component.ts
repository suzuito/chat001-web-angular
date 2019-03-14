import { Component, OnInit, Input } from '@angular/core';
import { Room, AgentInRoom } from 'src/app/model/room';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomService } from '../room.service';
import { RoomMemberSearchOptionService } from './room-member-search-option/room-member-search-option.service';

@Component({
  selector: 'app-room-member',
  templateUrl: './room-member.component.html',
  styleUrls: ['./room-member.component.scss']
})
export class RoomMemberComponent implements OnInit {

  public isSearchOptionOpened: boolean;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private roomService: RoomService,
    public searchOptService: RoomMemberSearchOptionService,
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

  public get room(): Room {
    return this.roomService.room;
  }

  public getAgentsInRoom(): AgentInRoom[] {
    return this.roomService.getAgents();
  }

  public iconExpander(): string {
    if (this.isSearchOptionOpened) {
      return 'expand_less';
    }
    return 'expand_more';
  }
}
