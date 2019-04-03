import { Component, AfterViewInit } from '@angular/core';
import { AgentService } from './agent.service';
import {
  setTestRooms,
  setTestAgentMessages,
  setTestRoomMessages,
  setTestAgent,
  setTestAgents,
} from './model/testdata';
import { RoomMessageService } from './room-message.service';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(
    private agentService: AgentService,
    private roomMessageService: RoomMessageService,
    private errorService: ErrorService,
  ) {
    // setTestAgent(this.agentService);
    // setTestAgents(this.dataService);
    // setTestRooms(this.dataService);
    // setTestAgentMessages(this.agentService);
    // setTestRoomMessages(this.roomMessageService, this.dataService);
  }

  ngAfterViewInit() {
    // this.errorService.warn('aaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa');
  }
}
