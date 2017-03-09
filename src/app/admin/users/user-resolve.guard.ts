import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UsersService } from './users.service';
import { DbUserDetails } from '../../services/backend/db-models/login';

@Injectable()
export class UserResolve implements Resolve<DbUserDetails> {

  constructor(public usersService: UsersService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    const login = route.params['login'];
    return this.usersService.getUser(login)
      .catch(e => {
        this.router.navigate(['/admin/users']);
        return Observable.of(false);
      });
  }

}
