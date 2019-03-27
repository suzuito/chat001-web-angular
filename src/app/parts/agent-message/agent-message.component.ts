import { Component, OnInit, Input } from '@angular/core';
import { AgentMessage } from 'src/app/model/agent_message';
import { EasyAgent } from 'src/app/model/agent';
import { MatDialog } from '@angular/material';
import { DialogProfileComponent } from '../dialog-profile/dialog-profile.component';
import { Room } from 'src/app/model/room';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Request } from 'src/app/model/request';

@Component({
  selector: 'app-agent-message',
  templateUrl: './agent-message.component.html',
  styleUrls: ['./agent-message.component.scss']
})
export class AgentMessageComponent implements OnInit {

  @Input()
  public message: AgentMessage;

  constructor(
    private appService: AppService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public roomName(room: Room): string {
    return room.name;
  }

  public agentName(agent: EasyAgent): string {
    return agent.name;
  }

  public openAgentDialog(agent: EasyAgent): void {
    this.dialog.open(DialogProfileComponent, { data: agent });
  }

  public clickApprove(req: Request): void {
    console.log(req);
    this.appService.postRequestsApprove(req);
  }

  public routeToRoomEntrance(room: Room): void {
    this.router.navigate(['room-entrance', room.id]);
  }

}
