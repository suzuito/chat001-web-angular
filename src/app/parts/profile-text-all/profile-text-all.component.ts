import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-text-all',
  templateUrl: './profile-text-all.component.html',
  styleUrls: ['./profile-text-all.component.scss']
})
export class ProfileTextAllComponent implements OnInit {

  @Input()
  public width: string;

  @Input()
  public height: string;

  constructor() { }

  ngOnInit() {
  }

}
