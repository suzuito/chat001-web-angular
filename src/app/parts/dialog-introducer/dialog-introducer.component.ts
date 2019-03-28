import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
  public roomSelected: Room;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataIntroducer,
    private ref: MatDialogRef<DialogIntroducerComponent>,
  ) {
    this.agentNames = data.agentNames;
    this.rooms = data.rooms;
    this.roomSelected = null;
  }

  ngOnInit() {
  }

  public iconLock(room: Room): string {
    if (room.password) {
      return 'lock';
    }
    return 'lock_open';
  }

  public clickYes(): void {
    this.ref.close(this.roomSelected);
  }

  public clickNo(): void {
    this.ref.close(null);
  }

  public disabledYes(): boolean {
    return this.roomSelected === null;
  }

}
