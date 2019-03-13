import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ProfileEditorComponent } from '../parts/profile-editor/profile-editor.component';
import { AgentService } from '../agent.service';
import { Agent } from '../model/agent';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(
    private agentService: AgentService,
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
}
