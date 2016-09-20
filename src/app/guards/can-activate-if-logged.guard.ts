import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UserService } from '../db-services/user.service';

@Injectable()
export class CanActivateIfLogged implements CanActivate {

  public constructor(public user: UserService) { }

  public canActivate() {
    if (this.user.isLoggedIn()) {
      return true;
    } else {
      this.user.logout();
      return false;
    }
  }
}
