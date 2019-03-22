import { Component, OnInit } from '@angular/core';
import { Header002Service } from './header002.service';

@Component({
  selector: 'app-header002',
  templateUrl: './header002.component.html',
  styleUrls: ['./header002.component.scss']
})
export class Header002Component implements OnInit {

  constructor(
    public s: Header002Service,
  ) { }

  ngOnInit() {
  }

}
