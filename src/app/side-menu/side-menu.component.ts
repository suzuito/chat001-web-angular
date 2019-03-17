import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ProfileEditorComponent } from '../parts/profile-editor/profile-editor.component';
import { AgentService } from '../agent.service';
import { Agent, RoomAgentIn } from '../model/agent';
import { Router } from '@angular/router';
import { AppRootService } from '../app-root/app-root.service';
import { Room } from '../model/room';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private agentService: AgentService,
    private appRootService: AppRootService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public openEditProfile(): void {
    this.dialog.open(ProfileEditorComponent, {
      autoFocus: false,
    });
  }

  public agent(): Agent {
    return this.agentService.get();
  }

  public routeToRoomCreator(): void {
    this.router.navigate(['room-creator']);
    this.appRootService.closeSideNav();
  }

  public roomsAgentIn(): Room[] {
    return this.agentService.filterRoom().map((v: RoomAgentIn) => v.room);
  }
}
