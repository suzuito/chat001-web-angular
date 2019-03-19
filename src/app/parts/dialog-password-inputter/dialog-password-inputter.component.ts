import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-password-inputter',
  templateUrl: './dialog-password-inputter.component.html',
  styleUrls: ['./dialog-password-inputter.component.scss']
})
export class DialogPasswordInputterComponent implements OnInit {

  public password: string;

  constructor(
    public ref: MatDialogRef<DialogPasswordInputterComponent>,
  ) { }

  ngOnInit() {
  }

  public keyup(event: any) {
    if (event.keyCode === 13) {
      this.ok();
    }
  }

  public ok() {
    this.ref.close(this.password);
  }

  public cancel() {
    this.ref.close(null);
  }

}
