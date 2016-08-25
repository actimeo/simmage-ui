import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UserService } from '../user.service';

@Injectable()
export class CanActivateIfLogged implements CanActivate {

  public constructor(private user: UserService) { }

  public canActivate() {
    if (this.user.isLoggedIn()) {
      return true;
    } else {
      this.user.logout();
      return false;
    }
  }
}
