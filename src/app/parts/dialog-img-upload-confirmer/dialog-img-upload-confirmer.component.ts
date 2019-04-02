import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-img-upload-confirmer',
  templateUrl: './dialog-img-upload-confirmer.component.html',
  styleUrls: ['./dialog-img-upload-confirmer.component.scss']
})
export class DialogImgUploadConfirmerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public src: string,
    private ref: MatDialogRef<DialogImgUploadConfirmerComponent>,
  ) { }

  ngOnInit() {
  }

  public ok() {
    this.ref.close(true);
  }

  public cancel() {
    this.ref.close(false);
  }

}
