import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from '../services/utils/user.service';

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
