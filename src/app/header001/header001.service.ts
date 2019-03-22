import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrderId } from '../rooms/rooms-search-option/rooms-search-option.service';

@Injectable({
  providedIn: 'root'
})
export class Header001Service {

  public title: string;

  constructor(
    private router: Router,
  ) {
    this.title = '新着順';
  }

  public routeToTop(): void {
    this.router.navigate(['']);
  }
  public routeToNewRooms(): void {
    this.router.navigate(['rooms'], { queryParams: { d: OrderId.Newed } });
  }
  public routeToBoostRooms(): void {
    this.router.navigate(['rooms'], { queryParams: { d: OrderId.Boost } });
  }
  public routeToAgents(): void {
    this.router.navigate(['agents']);
  }
  public routeToAgentMessages(): void {
    this.router.navigate(['agent-messages']);
  }
}
