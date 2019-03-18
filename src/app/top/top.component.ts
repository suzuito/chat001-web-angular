import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../model/room';
import { AgentService } from '../agent.service';
import { DataService } from '../data.service';
import { EasyAgent } from '../model/agent';
import { OrderId as RoomOrderId } from '../rooms/rooms-search-option/rooms-search-option.service';
import { OrderId as AgentOrderId } from '../agents/agents-search-option.service';
import { MatDialog } from '@angular/material';
import { DialogProfileComponent } from '../parts/dialog-profile/dialog-profile.component';
import { DialogRequesterComponent } from '../parts/dialog-requester/dialog-requester.component';
import { SideMenuScrollService, ScrollIdTop } from '../side-menu/side-menu-scroll.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private agentService: AgentService,
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog,
    private scrollService: SideMenuScrollService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollService.loadScrollPos(ScrollIdTop, false);
  }

  ngOnDestroy() {
    this.scrollService.saveScrollPos(ScrollIdTop);
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

  public openDialogProfile(agent: EasyAgent): void {
    this.dialog.open(DialogProfileComponent, { data: agent });
  }

  public openDialogRequester(agent: EasyAgent): void {
    this.dialog.open(DialogRequesterComponent, { data: agent });
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
