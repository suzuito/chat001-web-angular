import { Component, OnInit, Inject } from '@angular/core';
import { EasyAgent } from 'src/app/model/agent';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { urlAvatar } from 'src/app/util';
import { ProfileImageSize } from '../profile-img/profile-img.component';

export enum ResultDialogProfile {
  Request = 1,
  Intr,
}

export interface DataDialogProfile {
  agent: EasyAgent;
  readonly: boolean;
}

@Component({
  selector: 'app-dialog-profile',
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.scss']
})
export class DialogProfileComponent implements OnInit {

  public agent: EasyAgent;
  public readonly: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataDialogProfile,
    private ref: MatDialogRef<DialogProfileComponent>,
  ) {
    this.agent = data.agent;
    this.readonly = data.readonly;
  }

  ngOnInit() {
  }

  public urlImage() {
    return urlAvatar(this.agent.externalId, this.agent.avatarType, ProfileImageSize.Medium);
  }

  public clickRequest() {
    this.ref.close(ResultDialogProfile.Request);
  }

  public clickIntr() {
    this.ref.close(ResultDialogProfile.Intr);
  }

}
