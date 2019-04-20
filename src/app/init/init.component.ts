import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(
  ) {
  }

  public routeToTop() {
    location.href = 'room/暇（ヒマ）人集合';
  }

}
