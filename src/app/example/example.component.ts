import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogProgressiveComponent, defaultDialogConfigProgressive } from '../parts/dialog-progressive/dialog-progressive.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public openProgressiveDialog1(): void {
    const ref = this.dialog.open(DialogProgressiveComponent, defaultDialogConfigProgressive);
    setTimeout(() => {
      ref.componentInstance.fail('リクエストに失敗しました');
    }, 2000);
  }

  public openProgressiveDialog2(): void {
    const ref = this.dialog.open(DialogProgressiveComponent, defaultDialogConfigProgressive);
    setTimeout(() => {
      ref.componentInstance.success('リクエストに成功しました');
    }, 2000);
  }

}
