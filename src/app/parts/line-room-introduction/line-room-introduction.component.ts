import { Component, OnInit, Input } from '@angular/core';
import { LineDataRoomIntroduction } from 'src/app/model/line';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { DataRoomsService } from 'src/app/data-rooms.service';
import { DataSyncherService } from 'src/app/data-syncher.service';

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
  ) { }

  ngOnInit() {
  }

  public agentName(): string {
    if (!this.dataEasyAgentsService.has(this.intr.externalIdFrom)) {
      this.dataSyncherService.addAgent(this.intr.externalIdFrom);
      return this.intr.externalIdFrom;
    }
    return this.dataEasyAgentsService.get(this.intr.externalIdFrom).name;
  }

  public roomName(): string {
    if (!this.dataRoomsService.has(this.intr.roomId)) {
      return this.intr.roomId;
    }
    return this.dataRoomsService.get(this.intr.roomId).name;
  }

}
