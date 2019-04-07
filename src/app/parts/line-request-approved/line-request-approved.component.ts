import { Component, OnInit, Input } from '@angular/core';
import { RequestApproved } from 'src/app/model/request';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { DataSyncherService } from 'src/app/data-syncher.service';
import { MatDialog } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { DialogProfileComponent, DataDialogProfile } from '../dialog-profile/dialog-profile.component';

@Component({
  selector: 'app-line-request-approved',
  templateUrl: './line-request-approved.component.html',
  styleUrls: ['./line-request-approved.component.scss']
})
export class LineRequestApprovedComponent implements OnInit {

  @Input()
  public request: RequestApproved;

  constructor(
    private dataEasyAgentsService: DataEasyAgentsService,
    private dataSyncherService: DataSyncherService,
    private dialog: MatDialog,
    private appService: AppService,
  ) { }

  ngOnInit() {
  }

  public agentName(): string {
    if (!this.dataEasyAgentsService.has(this.request.dst.externalId)) {
      this.dataSyncherService.addAgent(this.request.dst.externalId);
      return this.request.dst.externalId;
    }
    return this.dataEasyAgentsService.get(this.request.dst.externalId).name;
  }

  public disableAgentButton(): boolean {
    return !this.dataEasyAgentsService.has(this.request.dst.externalId);
  }

  public roomName(): string {
    return this.request.room.name;
  }

  public routeToRoom(): void {
    this.appService.enterRoom(this.request.room);
  }

  public openAgentDialog(): void {
    if (!this.dataEasyAgentsService.has(this.request.dst.externalId)) {
      return;
    }
    this.dialog.open(DialogProfileComponent, {
      data: {
        readonly: true,
        agent: this.dataEasyAgentsService.get(this.request.dst.externalId),
      } as DataDialogProfile,
    });
  }

}
