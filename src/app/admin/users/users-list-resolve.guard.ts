import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UsersService } from './users.service';
import { DbUserDetails } from '../../db-models/login';

@Injectable()
export class UsersListResolve implements Resolve<DbUserDetails[]> {

  constructor(public usersService: UsersService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let login = route.params['selusergroup'];
    if (login) {
      return this.getData(login);
    } else {
      return this.getData(0);
    }
  }

  public getData(login) {
    return this.usersService.loadUsers(+login !== 0 ? login : null);
  }

}
