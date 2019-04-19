import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EasyAgent } from '../model/agent';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class InitAgentResolverService implements Resolve<EasyAgent> {

  constructor(
    private apiService: ApiService,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
  ): Promise<EasyAgent> {
    const externalId = route.params.externalId;
    return this.apiService.getLandingAgents(externalId)
      .catch(() => {
        window.location.href = '';
        return null;
      });
  }
}
