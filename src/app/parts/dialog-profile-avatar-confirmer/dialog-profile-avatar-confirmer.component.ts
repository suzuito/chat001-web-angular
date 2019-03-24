import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DataAvatarConfirmer {
  src: string;
}

@Component({
  selector: 'app-dialog-profile-avatar-confirmer',
  templateUrl: './dialog-profile-avatar-confirmer.component.html',
  styleUrls: ['./dialog-profile-avatar-confirmer.component.scss']
})
export class DialogProfileAvatarConfirmerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataAvatarConfirmer,
    private ref: MatDialogRef<DialogProfileAvatarConfirmerComponent>,
  ) { }

  ngOnInit() {
  }

  public ok(): void {
    this.ref.close(true);
  }

  public cancel(): void {
    this.ref.close(false);
  }

}
