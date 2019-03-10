import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { getRealStyle } from 'src/app/util';
import { EasyAgent } from 'src/app/model/agent';

@Component({
  selector: 'app-profile-list-each',
  templateUrl: './profile-list-each.component.html',
  styleUrls: ['./profile-list-each.component.scss']
})
export class ProfileListEachComponent implements OnInit {

  @Input()
  public agent: EasyAgent;

  @Input()
  public urlImg: string;

  @Input()
  public sizeImg: string;

  constructor() { }

  ngOnInit() {
  }

  public sizeImgLeftPx(): string {
    const n = parseInt(this.sizeImg, 10) + 10;
    return `${n}px`;
  }

  public sizeImgRightPx(): string {
    return `${this.sizeImg}px`;
  }

}
