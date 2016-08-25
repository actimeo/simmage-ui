import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../user.service';

@Injectable()
export class CanActivateIfAdmin implements CanActivate {

  public constructor(private user: UserService, private router: Router) { }

  public canActivate() {
    if (this.user.isAdmin()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
