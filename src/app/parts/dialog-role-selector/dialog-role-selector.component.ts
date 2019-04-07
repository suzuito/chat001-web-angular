import { Component, OnInit, Inject } from '@angular/core';
import { EasyAgent } from 'src/app/model/agent';
import { AgentRoleInRoom, agentRoles, roleName } from 'src/app/model/room';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DataDialogRoleSelector {
  readonly role: AgentRoleInRoom;
}

@Component({
  selector: 'app-dialog-role-selector',
  templateUrl: './dialog-role-selector.component.html',
  styleUrls: ['./dialog-role-selector.component.scss']
})
export class DialogRoleSelectorComponent implements OnInit {

  public role: AgentRoleInRoom;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataDialogRoleSelector,
    private ref: MatDialogRef<DialogRoleSelectorComponent>,
  ) {
    this.role = data.role;
  }

  ngOnInit() {
  }

  public agentRoles(): AgentRoleInRoom[] {
    return agentRoles;
  }

  public roleName(role: AgentRoleInRoom): string {
    return roleName(role);
  }

  public disabledUpdateButton(): boolean {
    return this.data.role === this.role;
  }

  public ok(): void {
    this.ref.close(this.role);
  }

  public cancel(): void {
    this.ref.close();
  }

}
