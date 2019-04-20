import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaService, defaultMetaBase, defaultMetaOG, defaultMetaTwitter } from '../meta.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {

  constructor(
    private router: Router,
    private metaService: MetaService,
  ) {
    this.metaService.setBase(defaultMetaBase);
    this.metaService.setOG(defaultMetaOG);
    this.metaService.setTwitter(defaultMetaTwitter);
  }

  ngOnInit(
  ) {
  }

  public routeToTop() {
    location.href = 'room/暇（ヒマ）人集合';
  }

}
