import { Component, OnInit, Inject } from '@angular/core';
import { EasyAgent } from 'src/app/model/agent';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { urlAvatar } from 'src/app/util';
import { ProfileImageSize } from '../profile-img/profile-img.component';

export enum DataDialogProfile {
  Request = 1,
  Intr,
}

@Component({
  selector: 'app-dialog-profile',
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.scss']
})
export class DialogProfileComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public agent: EasyAgent,
    private ref: MatDialogRef<DialogProfileComponent>,
  ) {
  }

  ngOnInit() {
  }

  public urlImage() {
    return urlAvatar(this.agent.externalId, this.agent.avatarType, ProfileImageSize.Medium);
  }

  public clickRequest() {
    this.ref.close(DataDialogProfile.Request);
  }

  public clickIntr() {
    this.ref.close(DataDialogProfile.Intr);
  }

}
