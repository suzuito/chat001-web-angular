import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrderId, RoomType } from '../rooms/rooms-search-option/rooms-search-option.service';
import { AgentService } from '../agent.service';

@Injectable({
  providedIn: 'root'
})
export class Header001Service {

  public title: string;

  constructor(
    private router: Router,
    private agentService: AgentService,
  ) {
    this.title = '新着順';
  }

  public routeToTop(): void {
    this.router.navigate(['']);
  }
  public routeToNewRooms(): void {
    this.router.navigate(['rooms'], { queryParams: { d: OrderId.Newed } });
  }
  public routeToFormalRooms(): void {
    this.router.navigate(['rooms'], { queryParams: { d: OrderId.Boost, t: RoomType.FixedOnly } });
  }
  public routeToAgents(): void {
    this.router.navigate(['agents']);
  }
  public routeToAgentMessages(): void {
    this.router.navigate(['agent-messages']);
  }

  public notifications(): number {
    return this.agentService.unreadMessages;
  }
}
