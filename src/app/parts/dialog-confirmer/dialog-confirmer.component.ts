import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DataDialogConfirmerComponent {
  readonly msg: string;
  readonly yes: string;
  readonly no: string;
}

@Component({
  selector: 'app-dialog-confirmer',
  templateUrl: './dialog-confirmer.component.html',
  styleUrls: ['./dialog-confirmer.component.scss']
})
export class DialogConfirmerComponent implements OnInit {

  public message: string;
  public yes: string;
  public no: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataDialogConfirmerComponent,
    public ref: MatDialogRef<DialogConfirmerComponent>,
  ) {
    this.message = data.msg;
    this.yes = data.yes;
    this.no = data.no;
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
