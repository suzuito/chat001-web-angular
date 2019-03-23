import { Component, OnInit } from '@angular/core';
import { Header001Service } from './header001.service';

@Component({
  selector: 'app-header001',
  templateUrl: './header001.component.html',
  styleUrls: ['./header001.component.scss']
})
export class Header001Component implements OnInit {

  constructor(
    public s: Header001Service,
  ) { }

  ngOnInit() {
  }

}
