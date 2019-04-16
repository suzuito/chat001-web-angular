import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-init-header',
  templateUrl: './init-header.component.html',
  styleUrls: ['./init-header.component.scss']
})
export class InitHeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  public clickIcon(): void {
    location.href = 'init';
  }
}
