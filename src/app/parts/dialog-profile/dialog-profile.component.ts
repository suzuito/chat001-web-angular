import { Component, OnInit, Inject } from '@angular/core';
import { EasyAgent } from 'src/app/model/agent';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-profile',
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.scss']
})
export class DialogProfileComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public agent: EasyAgent
  ) {
  }

  ngOnInit() {
  }

}
