import { Component, OnInit, Input } from '@angular/core';
import { LineDataRoomIntroduction } from 'src/app/model/line';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { DataRoomsService } from 'src/app/data-rooms.service';
import { DataSyncherService } from 'src/app/data-syncher.service';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { DialogProfileComponent, DataDialogProfile } from '../dialog-profile/dialog-profile.component';
import { DialogProfileRoomComponent, DataDialogProfileRoom } from '../dialog-profile-room/dialog-profile-room.component';

@Component({
  selector: 'app-line-room-introduction',
  templateUrl: './line-room-introduction.component.html',
  styleUrls: ['./line-room-introduction.component.scss']
})
export class LineRoomIntroductionComponent implements OnInit {

  @Input()
  public intr: LineDataRoomIntroduction;

  constructor(
    private dataEasyAgentsService: DataEasyAgentsService,
    private dataRoomsService: DataRoomsService,
    private dataSyncherService: DataSyncherService,
    private appService: AppService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public agentName(): string {
    return this.intr.agent.name;
  }

  public roomName(): string {
    return this.intr.room.name;
  }

  public enterRoom(): void {
    this.appService.enterRoom(this.intr.room);
  }

  public openAgentDialog(): void {
    this.dialog.open(DialogProfileComponent, {
      data: {
        readonly: true,
        agent: this.intr.agent,
      } as DataDialogProfile,
    });
  }

  public openRoomDialog(): void {
    this.dialog.open(DialogProfileRoomComponent, {
      data: {
        room: this.intr.room,
      } as DataDialogProfileRoom,
    });
  }

}
