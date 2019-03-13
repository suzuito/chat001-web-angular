import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../model/room';
import { AgentService } from '../agent.service';
import { DataService } from '../data.service';
import { ListAgentComponent } from '../parts/list-agent/list-agent.component';
import { ListRoomComponent } from '../parts/list-room/list-room.component';
import { EasyAgent } from '../model/agent';
import { OrderId as RoomOrderId } from '../rooms/rooms-search-option/rooms-search-option.service';
import { OrderId as AgentOrderId } from '../agents/agents-search-option.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor(
    private agentService: AgentService,
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public routeToRooms(): void {
    this.router.navigate(['rooms']);
  }

  public routeToAgents(): void {
    this.router.navigate(['agents']);
  }

  public routeToRoom(room: Room): void {
    this.router.navigate(['room', room.id]);
  }

  public agents(): EasyAgent[] {
    return this.dataService.filterTemporaryAgent({
      txtWord: '',
      selectedOrderId: AgentOrderId.Updated,
    });
  }

  public roomsNewed(): Room[] {
    return this.dataService.filterRoom({
      txtWord: '',
      members: 0,
      chkCanEnter: false,
      chkMembers: false,
      chkUnlocked: false,
      selectedOrderId: RoomOrderId.Newed,
    });
  }

  public roomsPopulated(): Room[] {
    return this.dataService.filterRoom({
      txtWord: '',
      members: 0,
      chkCanEnter: false,
      chkMembers: false,
      chkUnlocked: false,
      selectedOrderId: RoomOrderId.Popular,
    });
  }
}
