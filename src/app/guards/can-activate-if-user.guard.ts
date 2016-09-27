import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../shared/user.service';

@Injectable()
export class CanActivateIfUser implements CanActivate {

  public constructor(public router: Router, public user: UserService) { }

  public canActivate() {
    if (this.user.isUser()) {
      return true;
    } else {
      if (this.user.isAdmin()) {
        this.router.navigate(['/admin']);
      }
      return false;
    }
  }
}
