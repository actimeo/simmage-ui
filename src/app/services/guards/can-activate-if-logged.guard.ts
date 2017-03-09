import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { UserService } from '../utils/user.service';

@Injectable()
export class CanActivateIfLogged implements CanActivate {

  public constructor(public user: UserService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.user.isLoggedIn()) {
      return true;
    } else {
      window.localStorage.setItem('pageToGo', state.url);
      this.user.logout();
      return false;
    }
  }
}
