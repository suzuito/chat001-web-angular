import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Room, AgentInRoom } from 'src/app/model/room';
import { EasyAgent } from 'src/app/model/agent';

export interface DataIntroducer {
  rooms: Room[];
  agentNames: string[];
}

@Component({
  selector: 'app-dialog-introducer',
  templateUrl: './dialog-introducer.component.html',
  styleUrls: ['./dialog-introducer.component.scss']
})
export class DialogIntroducerComponent implements OnInit {

  public agentNames: string[];
  public rooms: Room[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataIntroducer,
  ) {
    this.agentNames = data.agentNames;
    this.rooms = data.rooms;
  }

  ngOnInit() {
  }

  public iconLock(room: Room): string {
    if (room.password) {
      return 'lock';
    }
    return 'lock_open';
  }

}
