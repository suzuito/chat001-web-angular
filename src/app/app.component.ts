import { Component } from '@angular/core';
import { AgentService } from './agent.service';
import { DataService } from './data.service';
import { setTestAgents, setTestRooms, setTestAgentMessages } from './model/testdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private agentService: AgentService,
    private dataService: DataService,
  ) {
    setTestAgents(this.dataService);
    setTestRooms(this.dataService);
    setTestAgentMessages(this.agentService);
  }
}
