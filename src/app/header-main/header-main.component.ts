import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {

  @Input()
  public title: string;

  @Output()
  public clickMenu: EventEmitter<void>;

  constructor() {
    this.clickMenu = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  public clickOpenMenu(): void {
    console.log('hello');
    this.clickMenu.emit();
  }

}
