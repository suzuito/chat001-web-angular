import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { getRealStyle } from 'src/app/util';

@Component({
  selector: 'app-dialog-img-upload-confirmer',
  templateUrl: './dialog-img-upload-confirmer.component.html',
  styleUrls: ['./dialog-img-upload-confirmer.component.scss']
})
export class DialogImgUploadConfirmerComponent implements OnInit {

  @ViewChild('main')
  private main: ElementRef;

  public heightImage: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public src: string,
    private ref: MatDialogRef<DialogImgUploadConfirmerComponent>,
  ) {
    this.heightImage = 0;
  }

  ngOnInit() {
    this.heightImage = this.main.nativeElement.offsetHeight;
  }

  public ok() {
    this.ref.close(true);
  }

  public cancel() {
    this.ref.close(false);
  }

}
