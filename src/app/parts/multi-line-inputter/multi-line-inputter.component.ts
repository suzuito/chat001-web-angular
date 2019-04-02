import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-multi-line-inputter',
  templateUrl: './multi-line-inputter.component.html',
  styleUrls: ['./multi-line-inputter.component.scss']
})
export class MultiLineInputterComponent implements OnInit {


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public message: string,
    private ref: MatBottomSheetRef<MultiLineInputterComponent>,
  ) {
  }

  ngOnInit() {
  }

  public ok() {
    this.ref.dismiss(this.message);
  }
  public cancel() {
    this.ref.dismiss(null);
  }

}
