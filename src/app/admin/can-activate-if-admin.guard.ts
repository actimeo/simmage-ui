import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../user.service';

@Injectable()
export class CanActivateIfAdmin implements CanActivate {

  public constructor(private user: UserService, public router: Router) { }

  public canActivate() {
    if (this.user.isAdmin()) {
      return true;
    } else {
      if (this.user.isUser()) {
        this.router.navigate(['/main']);
      }
      return false;
    }
  }
}
