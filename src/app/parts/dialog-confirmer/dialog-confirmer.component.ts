import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-confirmer',
  templateUrl: './dialog-confirmer.component.html',
  styleUrls: ['./dialog-confirmer.component.scss']
})
export class DialogConfirmerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string,
    public ref: MatDialogRef<DialogConfirmerComponent>,
  ) {
  }

  ngOnInit() {
  }

  public ok() {
    this.ref.close(true);
  }

  public cancel() {
    this.ref.close(false);
  }

}
