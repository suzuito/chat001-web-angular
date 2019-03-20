import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { EasyAgent } from 'src/app/model/agent';

@Component({
  selector: 'app-profile-text-all-with-icon2',
  templateUrl: './profile-text-all-with-icon2.component.html',
  styleUrls: ['./profile-text-all-with-icon2.component.scss']
})
export class ProfileTextAllWithIcon2Component implements OnInit, AfterViewInit {

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

  @Input()
  public icon: string;

  @Output()
  public clickProfile: EventEmitter<void>;

  @Output()
  public clickIconButton: EventEmitter<void>;

  @ViewChild('profileBox')
  private domProfile: ElementRef;

  @ViewChild('buttonBox')
  private domButton: ElementRef;

  constructor() {
    this.linesDescription = 1;
    this.nameOnly = false;
    this.paddingBetween = 10;
    this.icon = 'info';
    this.clickProfile = new EventEmitter<void>();
    this.clickIconButton = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // const cssButton = getComputedStyle(this.domButton.nativeElement);
    // this.domProfile.nativeElement.style['padding-right'] = `${parseInt(cssButton.width, 10) + this.paddingBetween}px`;
  }
}
