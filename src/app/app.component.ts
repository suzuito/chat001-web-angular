import { Component } from '@angular/core';
import { AgentService } from './agent.service';
import { DataService } from './data.service';
import {
  setTestRooms,
  setTestAgentMessages,
  setTestRoomMessages,
  setTestTemporaryAgents,
  setTestAgent,
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
    private dataService: DataService,
    private roomMessageService: RoomMessageService,
  ) {
    setTestAgent(this.agentService);
    setTestTemporaryAgents(this.dataService);
    setTestRooms(this.dataService);
    setTestAgentMessages(this.agentService);
    setTestRoomMessages(this.roomMessageService, this.dataService);
  }
}
