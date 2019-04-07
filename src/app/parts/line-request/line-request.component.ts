import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { Request } from 'src/app/model/request';
import { DataSyncherService } from 'src/app/data-syncher.service';
import { MatDialog } from '@angular/material';
import { DialogProfileComponent, DataDialogProfile } from '../dialog-profile/dialog-profile.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-line-request',
  templateUrl: './line-request.component.html',
  styleUrls: ['./line-request.component.scss']
})
export class LineRequestComponent implements OnInit {

  @Input()
  public request: Request;

  constructor(
    private dataEasyAgentsService: DataEasyAgentsService,
    private dataSyncherService: DataSyncherService,
    private dialog: MatDialog,
    private appService: AppService,
  ) { }

  ngOnInit() {
  }

  public agentName(): string {
    if (!this.dataEasyAgentsService.has(this.request.srcExternalId)) {
      this.dataSyncherService.addAgent(this.request.srcExternalId);
      return this.request.srcExternalId;
    }
    return this.dataEasyAgentsService.get(this.request.srcExternalId).name;
  }

  public clickApprove(): void {
    this.appService.postRequestsApprove(this.request);
  }

  public msg(): string {
    return this.request.message;
  }

  public disableAgentButton(): boolean {
    return !this.dataEasyAgentsService.has(this.request.srcExternalId);
  }

  public openAgentDialog(): void {
    if (!this.dataEasyAgentsService.has(this.request.srcExternalId)) {
      return;
    }
    this.dialog.open(DialogProfileComponent, {
      data: {
        readonly: true,
        agent: this.dataEasyAgentsService.get(this.request.srcExternalId),
      } as DataDialogProfile,
    });
  }

}
