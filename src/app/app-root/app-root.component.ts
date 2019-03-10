import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent {

  public tests: string[];

  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  constructor(
    private router: Router,
  ) {
    this.tests = [];
    for (let i = 0; i < 1000; i++) {
      this.tests.push(`var-${i}`);
    }
  }

  public openSidenav(): void {
    this.sidenav.toggle();
  }

  public routeToTop(): void {
    this.router.navigate(['']);
  }

  public routeToAgentMessages(): void {
    this.router.navigate(['agent-messages']);
  }
}
