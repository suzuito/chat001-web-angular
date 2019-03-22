import { Component } from '@angular/core';
import { AgentService } from './agent.service';
import {
  setTestRooms,
  setTestAgentMessages,
  setTestRoomMessages,
  setTestAgent,
  setTestAgents,
} from './model/testdata';
import { RoomMessageService } from './room-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private agentService: AgentService,
    private roomMessageService: RoomMessageService,
  ) {
    // setTestAgent(this.agentService);
    // setTestAgents(this.dataService);
    // setTestRooms(this.dataService);
    // setTestAgentMessages(this.agentService);
    // setTestRoomMessages(this.roomMessageService, this.dataService);
  }
}
