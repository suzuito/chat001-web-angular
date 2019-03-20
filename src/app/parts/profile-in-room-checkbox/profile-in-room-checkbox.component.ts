import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AgentInRoom, AgentRoleInRoom } from 'src/app/model/room';

@Component({
  selector: 'app-profile-in-room-checkbox',
  templateUrl: './profile-in-room-checkbox.component.html',
  styleUrls: ['./profile-in-room-checkbox.component.scss']
})
export class ProfileInRoomCheckboxComponent implements OnInit {

  @Input()
  public agentInRoom: AgentInRoom;

  @Input()
  public checked: boolean;
  @Output()
  public checkedChange: EventEmitter<boolean>;

  @Output()
  public clickRole: EventEmitter<void>;

  constructor() {
    this.clickRole = new EventEmitter<void>();
    this.checkedChange = new EventEmitter<boolean>();
  }

  ngOnInit() {
  }

  public change() {
    this.checkedChange.emit(this.checked);
  }

  public role(): string {
    if (this.agentInRoom.role === AgentRoleInRoom.Member) {
      return 'member';
    }
    if (this.agentInRoom.role === AgentRoleInRoom.Owner) {
      return 'owner';
    }
    return 'member';
  }

  public roleColor(): string {
    if (this.agentInRoom.role === AgentRoleInRoom.Member) {
      return '';
    }
    if (this.agentInRoom.role === AgentRoleInRoom.Owner) {
      return 'primary';
    }
    return '';
  }

}
