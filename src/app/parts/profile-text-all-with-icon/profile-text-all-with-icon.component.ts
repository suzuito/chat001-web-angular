import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Agent, EasyAgent } from 'src/app/model/agent';

@Component({
  selector: 'app-profile-text-all-with-icon',
  templateUrl: './profile-text-all-with-icon.component.html',
  styleUrls: ['./profile-text-all-with-icon.component.scss']
})
export class ProfileTextAllWithIconComponent implements OnInit, AfterViewInit {

  @Input()
  public width: string;

  @Input()
  public paddingBetween: number;

  @Input()
  public linesDescription: number;

  @Input()
  public agent: EasyAgent;

  @Input()
  public nameOnly: boolean;

  @ViewChild('leftBox')
  public domLeft: ElementRef;

  @ViewChild('rightBox')
  public domRight: ElementRef;

  @ViewChild('mainBox')
  public domMain: ElementRef;

  constructor() {
    this.linesDescription = 1;
    this.nameOnly = false;
    this.paddingBetween = 10;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const cssLeft = getComputedStyle(this.domLeft.nativeElement);
    this.domRight.nativeElement.style['padding-left'] = `${parseInt(cssLeft.width, 10) + this.paddingBetween}px`;
  }
}
