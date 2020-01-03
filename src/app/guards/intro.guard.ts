import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate, CanLoad {
  constructor(
    private storage: Storage,
    private router: Router) { }

  async canActivate(
  ) {
    const isIntroShowed = await this.storage.get('isIntroShowed');
    if (isIntroShowed) {

      return true;
    } else {
      this.router.navigateByUrl('/intro');
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
