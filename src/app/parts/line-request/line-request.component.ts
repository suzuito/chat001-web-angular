import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataEasyAgentsService } from 'src/app/data-easy-agents.service';
import { Request } from 'src/app/model/request';

@Component({
  selector: 'app-line-request',
  templateUrl: './line-request.component.html',
  styleUrls: ['./line-request.component.scss']
})
export class LineRequestComponent implements OnInit {

  @Input()
  public request: Request;

  @Output()
  public approve: EventEmitter<string>;

  constructor(
    private dataEasyAgentsService: DataEasyAgentsService,
  ) { }

  ngOnInit() {
  }

  public agentName(): string {
    if (!this.dataEasyAgentsService.has(this.request.srcExternalId)) {
      return this.request.srcExternalId;
    }
    return this.dataEasyAgentsService.get(this.request.srcExternalId).name;
  }

  public clickApprove(): void {
    this.approve.emit(this.request.id);
  }

}
