import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EasyAgent } from 'src/app/model/agent';

export interface DataDialogRequester {
  agent: EasyAgent;
  message: string;
}

@Component({
  selector: 'app-dialog-requester',
  templateUrl: './dialog-requester.component.html',
  styleUrls: ['./dialog-requester.component.scss']
})
export class DialogRequesterComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataDialogRequester
  ) {
  }

  ngOnInit() {
  }
}
