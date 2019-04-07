import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EasyAgent } from 'src/app/model/agent';
import { urlAvatar } from 'src/app/util';
import { ProfileImageSize } from '../profile-img/profile-img.component';

export interface DataDialogRequester {
  agent: EasyAgent;
  message: string;
}

@Component({
  selector: 'app-dialog-requester',
  templateUrl: './dialog-requester.component.html',
  styleUrls: ['./dialog-requester.component.scss']
})
export class DialogRequesterComponent implements OnInit {

  public maxLength: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataDialogRequester,
    private ref: MatDialogRef<DialogRequesterComponent>,
  ) {
    this.data.message = '';
    this.maxLength = 50;
  }

  ngOnInit() {
  }

  public agentName(): string {
    if (this.data.agent) {
      return this.data.agent.name;
    }
    return '';
  }

  public urlImage() {
    if (this.data.agent) {
      return urlAvatar(this.data.agent.externalId, this.data.agent.avatarType, ProfileImageSize.Medium);
    }
    return '';
  }

  public clickSendRequest(): void {
    this.ref.close(this.data);
  }

  public clickCancel(): void {
    this.ref.close(null);
  }

  public disabledButton(): boolean {
    return this.data.message === '';
  }

  public hintLabel(): string {
    return `最大${this.maxLength}文字`;
  }

  public hint(): string {
    return `${this.data.message.length} / ${this.maxLength}`;
  }
}
