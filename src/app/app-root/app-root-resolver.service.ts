import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Router, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppRootResolverService implements Resolve<boolean> {

  constructor(
    private app: AppService,
    private router: Router,
  ) { }

  public async resolve(): Promise<boolean> {
    return this.app.initialize().then(() => {
      return true;
    }).catch((err) => {
      console.error(err);
      this.router.navigate(['error']);
      return false;
    });
  }

}
