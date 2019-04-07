import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material';

enum State {
  Progress = 1,
  Success,
  Fail,
}

export const defaultDialogConfigProgressive: MatDialogConfig = {
  width: '80%',
  autoFocus: false,
  disableClose: true,
};

@Component({
  selector: 'app-dialog-progressive',
  templateUrl: './dialog-progressive.component.html',
  styleUrls: ['./dialog-progressive.component.scss']
})
export class DialogProgressiveComponent implements OnInit {

  public state: State;
  public msg: string;

  constructor(
    private ref: MatDialogRef<DialogProgressiveComponent>,
  ) {
    this.state = State.Progress;
    this.msg = '';
  }

  ngOnInit() {
  }

  public colorIcon(): string {
    if (this.state === State.Success) {
      return 'primary';
    }
    return 'warn';
  }

  public icon(): string {
    if (this.state === State.Success) {
      return 'done';
    }
    return 'error_outline';
  }

  public success(msg: string): void {
    this.msg = msg;
    this.state = State.Success;
    this.ref.disableClose = false;
    this.autoClose();
  }

  public fail(msg: string): void {
    this.msg = msg;
    this.state = State.Fail;
  }

  public close(): void {
    this.ref.close();
  }

  public autoClose(): void {
    setTimeout(() => {
      this.close();
    }, 500);
  }

}
